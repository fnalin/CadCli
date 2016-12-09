using FanSoft.CadCli.Api.Infra.Models;
using FanSoft.CadCli.Core.Contracts.Repositories;
using FanSoft.CadCli.Core.Data;
using FanSoft.CadCli.Core.Data.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Net;

namespace FanSoft.CadCli.Api
{
    public class Startup
    {
        private readonly TokenAuthOptions _tokenOptions;
        private readonly RsaSecurityKey _key;
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {

            _key = Infra.Security.GetKey();
            _tokenOptions = Infra.TokenAuth.GetToken(_key);


            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<TokenAuthOptions>(_tokenOptions);

            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser().Build()
                );
            });


            services.AddMvc().AddJsonOptions(opt =>
            {
                var jsonSettings = opt.SerializerSettings;
                jsonSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
                jsonSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
            services.AddSingleton(Configuration);
            services.AddScoped(typeof(CadCliDataContext));
            services.AddTransient(typeof(IUsuarioRepository), typeof(UsuarioRepository));
            services.AddTransient(typeof(IClienteRepository), typeof(ClienteRepository));

        }

        public void Configure(IApplicationBuilder app, 
            IHostingEnvironment env, ILoggerFactory loggerFactory,
            CadCliDataContext dataContext)
        {
            loggerFactory.AddConsole();

            app.UseExceptionHandler(appBuilder =>
            {
                appBuilder.Use(async (context, next) =>
                {
                    var error = context.Features[typeof(IExceptionHandlerFeature)] as IExceptionHandlerFeature;
                    if (error != null && error.Error is SecurityTokenExpiredException)
                    {
                        context.Response.StatusCode = 401;
                        context.Response.ContentType = "application/json";
                        await context.Response.WriteAsync(
                            JsonConvert.SerializeObject(
                                new { authenticated = false, tokenExpired = true }));
                    }
                    else if (error != null && error.Error != null)
                    {
                        context.Response.StatusCode = 500;
                        context.Response.ContentType = "application/json";
                        await context.Response.WriteAsync(
                            JsonConvert.SerializeObject
                            (new { success = false, error = error.Error.Message }));
                    }
                    else await next();
                });
            });

            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = _key,
                    ValidAudience = _tokenOptions.Audience,
                    ValidIssuer = _tokenOptions.Issuer,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromMinutes(0)
                }
            });


            app.UseMvcWithDefaultRoute();
            app.UseMvc();

            DbInitializer.Initialize(dataContext);

            app.Run(async (context) =>
            {
                context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                await context.Response.WriteAsync("Recurso não encontrado!");
            });
        }
    }
}

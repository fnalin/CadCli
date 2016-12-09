using FanSoft.CadCli.Api.Infra.Models;
using FanSoft.CadCli.Api.Models;
using FanSoft.CadCli.Core.Contracts.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace FanSoft.CadCli.Api.Controllers
{
    [Route("api/v1/security/token")]
    public class SecurityTokenController : Controller
    {
        private readonly TokenAuthOptions _tokenOptions;
        public SecurityTokenController(TokenAuthOptions tokenOptions)
        {
            _tokenOptions = tokenOptions;
        }

        [Authorize]
        public Task<IActionResult> Get()
        {
            var authenticated = false;
            string user = null;
            var entityId = 0;
            string token = null;
            var tokenExpires = default(DateTime);

            var currentUser = HttpContext.User;
            if (currentUser != null)
            {
                authenticated = currentUser.Identity.IsAuthenticated;
                if (authenticated)
                {
                    user = currentUser.Identity.Name;
                    foreach (Claim c in currentUser.Claims)
                    {
                        if (c.Type == "entityID")
                            entityId = int.Parse(c.Value);
                    }

                    tokenExpires = DateTime.UtcNow.AddMinutes(60);
                    token = GetToken(currentUser.Identity.Name, entityId, tokenExpires);
                }
            }

            return Task.FromResult<IActionResult>(Json(
                new
                {
                    authenticated = authenticated,
                    user = user,
                    entityId = entityId,
                    token = token,
                    tokenExpires = tokenExpires
                }
                )
            );
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromServices]IUsuarioRepository repo, [FromBody] AuthRequestVM req)
        {
            var user = await repo.VerificarUsuarioESenhaAsync(req.Username, req.Password);

            dynamic dados = null;
            if (user != null)
            {
                var expires = DateTime.UtcNow.AddMinutes(60);
                var token = GetToken(req.Username, user.Id, expires);
                dados = new
                {
                    authenticated = true,
                    entityId = user.Id,
                    token = token,
                    tokenExpires = expires
                };
            }
            else
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                dados = new { authenticated = false };
            }

            return Json(dados);

        }

        private string GetToken(string username, int entityId, DateTime expires)
        {
            var handler = new JwtSecurityTokenHandler();

            var identity =
                new ClaimsIdentity(
                    new GenericIdentity(username, "TokenAuth"), new[] {
                        new Claim("entityID", entityId.ToString(), ClaimValueTypes.Integer32)
                    }
                );

            var securityToken = handler.CreateToken(new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor()
            {
                Issuer = _tokenOptions.Issuer,
                Audience = _tokenOptions.Audience,
                SigningCredentials = _tokenOptions.SigningCredentials,
                Subject = identity,
                Expires = expires
            });
            return handler.WriteToken(securityToken);
        }
    }
}

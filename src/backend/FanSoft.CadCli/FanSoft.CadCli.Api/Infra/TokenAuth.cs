using FanSoft.CadCli.Api.Infra.Models;
using Microsoft.IdentityModel.Tokens;

namespace FanSoft.CadCli.Api.Infra
{
    internal class TokenAuth
    {
        internal static TokenAuthOptions GetToken(RsaSecurityKey key)
        {
            return new TokenAuthOptions
            {
                //Aplicação que está solicitando o token
                Audience = "XPTO_APP",

                // Aplicação que está gerando o token
                Issuer = "FanSoft.CadCli",

                //Credencial
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.RsaSha256Signature)
            };
        }
    }
}
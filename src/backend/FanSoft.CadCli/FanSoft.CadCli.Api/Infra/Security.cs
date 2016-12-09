using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

namespace FanSoft.CadCli.Api.Infra
{
    internal class Security
    {
        internal static RsaSecurityKey GetKey()
        {
            var rsa = new RSACryptoServiceProvider(2048);
            return new RsaSecurityKey(rsa.ExportParameters(true));
        }

    }
}
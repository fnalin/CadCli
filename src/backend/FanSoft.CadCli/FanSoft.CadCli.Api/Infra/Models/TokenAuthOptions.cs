using Microsoft.IdentityModel.Tokens;

namespace FanSoft.CadCli.Api.Infra.Models
{
    public class TokenAuthOptions
    {
        public string Audience { get; set; }
        public string Issuer { get; set; }
        public SigningCredentials SigningCredentials { get; set; }
    }
}

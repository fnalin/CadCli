using FanSoft.CadCli.Core.Contracts.Repositories;
using FanSoft.CadCli.Core.Entities;
using FanSoft.CadCli.Core.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FanSoft.CadCli.Core.Data.Repositories
{
    public class UsuarioRepository : Repository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(CadCliDataContext context) : base(context)
        { }

        public async Task<Usuario> VerificarUsuarioESenhaAsync(string username, string password)
        {
            return await
                _context.Set<Entities.Usuario>()
                    .FirstOrDefaultAsync(d => d.Email.ToLower() == username.ToLower() && d.Senha == criptPassword(password));
        }

        private string criptPassword(string senha)
        {
            return StringHelpers.Encrypt(senha);
        }
    }
}

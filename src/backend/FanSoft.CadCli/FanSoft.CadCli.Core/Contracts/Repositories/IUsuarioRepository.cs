using System.Threading.Tasks;
using FanSoft.CadCli.Core.Entities;

namespace FanSoft.CadCli.Core.Contracts.Repositories
{
    public interface IUsuarioRepository : IRepository<Usuario>
    {
        Task<Usuario> VerificarUsuarioESenhaAsync(string username, string password);
    }
}

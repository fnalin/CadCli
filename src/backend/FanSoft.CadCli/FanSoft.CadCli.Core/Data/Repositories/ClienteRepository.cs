using System.Collections.Generic;
using System.Threading.Tasks;
using FanSoft.CadCli.Core.Contracts.Repositories;
using FanSoft.CadCli.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace FanSoft.CadCli.Core.Data.Repositories
{
    public class ClienteRepository : Repository<Cliente>, IClienteRepository
    {
        public ClienteRepository(CadCliDataContext context) : base(context)
        { }

        public override Cliente Obter(params object[] key)
        {
            return _context.Clientes.FirstOrDefault(d => d.Id == (int)key[0]);
        }
        public override async Task<Cliente> ObterAsync(params object[] key)
        {
            return await _context.Clientes.FirstOrDefaultAsync(d => d.Id == (int)key[0]);
        }

        public override IEnumerable<Cliente> Obter()
        {
            return _context.Clientes.Include(d => d.Telefones);
        }

        public override async Task<IEnumerable<Cliente>> ObterAsync()
        {
            return await _context.Clientes.Include(d => d.Telefones).ToListAsync();
        }
    }
}

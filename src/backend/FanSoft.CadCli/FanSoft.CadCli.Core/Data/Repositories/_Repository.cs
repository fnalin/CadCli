using FanSoft.CadCli.Core.Contracts.Repositories;
using FanSoft.CadCli.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FanSoft.CadCli.Core.Data.Repositories
{
    public abstract class Repository<T> : IRepository<T> where T : Entity
    {
        protected readonly CadCliDataContext _context;

        public Repository(CadCliDataContext context)
        {
            _context = context;
        }

        public void Adicionar(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void Atualizar(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public void Excluir(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public void Salvar()
        {
            _context.SaveChanges();
        }

        public virtual T Obter(object key)
        {
            return _context.Set<T>().Find(key);
        }

        public virtual async Task<T> ObterAsync(object key)
        {
            return await _context.Set<T>().FindAsync(key);
        }

        public virtual async Task<IEnumerable<T>> ObterAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public virtual IEnumerable<T> Obter()
        {
            return _context.Set<T>();
        }


    }
}
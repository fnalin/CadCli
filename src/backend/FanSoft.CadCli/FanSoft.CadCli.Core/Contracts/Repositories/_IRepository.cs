using FanSoft.CadCli.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FanSoft.CadCli.Core.Contracts.Repositories
{
    public interface IRepository<T> :
        IDisposable where T : Entity
    {
        void Adicionar(T entity);
        void Atualizar(T entity);
        void Excluir(T entity);
        void Salvar();

        IEnumerable<T> Obter();
        Task<IEnumerable<T>> ObterAsync();
        T Obter(params object[] key);
        Task<T> ObterAsync(params object[] key);
    }
}

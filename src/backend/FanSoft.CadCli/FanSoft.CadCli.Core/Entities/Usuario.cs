using FanSoft.CadCli.Core.Helpers;
using System;

namespace FanSoft.CadCli.Core.Entities
{
    public class Usuario : Entity
    {
        protected Usuario() { }
        public Usuario(string nome, string email, string senha)
        {
            Nome = nome;
            Email = email;
            Senha = StringHelpers.Encrypt(senha);
        }

        public string Nome { get; private set; }
        public string Email { get; private set; }
        public string Senha { get; private set; }

        public void Alterar(string nome, string email, string senha)
        {
            Nome = nome;
            Email = email;
            Senha = StringHelpers.Encrypt(senha);
            Alteracao = DateTime.Now;
        }
    }
}

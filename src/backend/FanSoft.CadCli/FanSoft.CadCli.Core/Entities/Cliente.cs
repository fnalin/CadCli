using System;
using System.Collections.Generic;

namespace FanSoft.CadCli.Core.Entities
{
    public enum Sexo
    {
        Masculino, Feminino
    }

    public class Cliente : Entity
    {
        protected Cliente() { }
        public Cliente(string nome, Sexo sexo)
        {
            Nome = nome;
            Sexo = sexo;
            Telefones = new List<Telefone>();
        }

        public string Nome { get; private set; }
        public Sexo Sexo { get; private set; }
        public ICollection<Telefone> Telefones { get; set; }

        public void Alterar(string nome, Sexo sexo)
        {
            Nome = nome;
            Sexo = sexo;
            Alteracao = DateTime.Now;
        }
    }
}

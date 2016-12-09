using System;

namespace FanSoft.CadCli.Core.Entities
{
    public class Entity
    {
        public Entity()
        {
            Alteracao = Cadastro = DateTime.Now;
        }

        public int Id { get; private set; }
        public DateTime Cadastro { get; private set; }
        public DateTime Alteracao { get; protected set; }
    }
}
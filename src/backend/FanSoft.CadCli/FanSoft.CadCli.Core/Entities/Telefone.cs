namespace FanSoft.CadCli.Core.Entities
{
    public class Telefone : Entity
    {
        protected Telefone() { }
        public Telefone(string numero, int clienteId)
        {
            this.Numero = numero;
            this.ClienteId = clienteId;
        }

        public string Numero { get; private set; }
        public int ClienteId { get; private set; }
        public Cliente Cliente { get; private set; }
    }
}

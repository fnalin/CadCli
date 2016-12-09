using FanSoft.CadCli.Core.Entities;
using System.Collections.Generic;
using System.Linq;

namespace FanSoft.CadCli.Core.Data
{
    public static class DbInitializer
    {
        public static void Initialize(CadCliDataContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Clientes.Any())
            {
                return;   // DB has been seeded
            }

            var cli1 = new Cliente("Roberval Souza", Sexo.Masculino);
            cli1.Telefones.Add(new Telefone("11555558877", 0));

            var cli2 = new Cliente("Creuza Santos", Sexo.Feminino);


            var clientes = new List<Cliente>();
            clientes.Add(cli1);
            clientes.Add(cli2);

            context.Clientes.AddRange(clientes);

            var usuarios = new List<Usuario> {
                new Usuario("Fabiano Nalin","fabiano.nalin@gmail.com", "123456")
            };
            context.Usuarios.AddRange(usuarios);

            context.SaveChanges();

            
        }
    }
}

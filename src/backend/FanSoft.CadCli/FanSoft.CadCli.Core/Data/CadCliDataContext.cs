using FanSoft.CadCli.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace FanSoft.CadCli.Core.Data
{
    public class CadCliDataContext : DbContext
    {
        private readonly string _conn;

        public CadCliDataContext(IConfigurationRoot config)
        {
            _conn = config["ConnectionStrings:CadCliConn"];
            if (string.IsNullOrWhiteSpace(_conn))
            {
                throw new ArgumentException("Connection string not found");
            }
        }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_conn);
            //optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=FanSoft.CadCli;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Entities.Usuario>(usuario =>
            {
                //Tabela
                usuario.ToTable("Usuario");
                usuario.HasKey(c => c.Id);

                //Campos
                usuario.Property(col => col.Id)
                    .HasColumnName("Id")
                    .HasColumnType("int")
                    .ValueGeneratedOnAdd();

                usuario.Property(col => col.Nome)
                   .HasColumnName("Nome")
                   .HasColumnType("varchar(50)")
                   .IsRequired();

                usuario.Property(col => col.Email)
                   .HasColumnName("Email")
                   .HasColumnType("varchar(100)")
                   .IsRequired();

                usuario.Property(col => col.Senha)
                   .HasColumnName("Senha")
                   .HasColumnType("varchar(50)")
                   .IsRequired();

                usuario.Property(col => col.Cadastro)
                   .HasColumnName("Cadastro")
                   .HasColumnType("datetime")
                   .IsRequired();

                usuario.Property(col => col.Alteracao)
                   .HasColumnName("Alteracao")
                   .HasColumnType("datetime")
                   .IsRequired();

            });

            modelBuilder.Entity<Entities.Cliente>(cliente =>
            {
                //Tabela
                cliente.ToTable("Cliente");
                cliente.HasKey(c => c.Id);

                //Campos
                cliente.Property(col => col.Id)
                    .HasColumnName("Id")
                    .HasColumnType("int")
                    .ValueGeneratedOnAdd();

                cliente.Property(col => col.Nome)
                   .HasColumnName("Nome")
                   .HasColumnType("varchar(50)")
                   .IsRequired();

                cliente.Property(col => col.Sexo)
                   .HasColumnName("Sexo")
                   .HasColumnType("int")
                   .IsRequired();

                cliente.Property(col => col.Cadastro)
                   .HasColumnName("Cadastro")
                   .HasColumnType("datetime")
                   .IsRequired();

                cliente.Property(col => col.Alteracao)
                   .HasColumnName("Alteracao")
                   .HasColumnType("datetime")
                   .IsRequired();

            });

            modelBuilder.Entity<Entities.Telefone>(telefone =>
            {
                //Tabela
                telefone.ToTable("Telefone");
                telefone.HasKey(c => c.Id);

                //Campos
                telefone.Property(col => col.Id)
                    .HasColumnName("Id")
                    .HasColumnType("int")
                    .ValueGeneratedOnAdd();

                telefone.Property(col => col.Numero)
                   .HasColumnName("Numero")
                   .HasColumnType("varchar(11)")
                   .IsRequired();

                telefone.Property(col => col.Cadastro)
                   .HasColumnName("Cadastro")
                   .HasColumnType("datetime")
                   .IsRequired();

                telefone.Property(col => col.Alteracao)
                   .HasColumnName("Alteracao")
                   .HasColumnType("datetime")
                   .IsRequired();

                //Relacionamento
                telefone.HasOne(col => col.Cliente)
                    .WithMany(col => col.Telefones)
                    .HasForeignKey(fk => fk.ClienteId);
            });

        }
    }
}

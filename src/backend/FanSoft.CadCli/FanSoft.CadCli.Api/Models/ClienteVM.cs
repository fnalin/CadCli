using FanSoft.CadCli.Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace FanSoft.CadCli.Api.Models
{
    public class ClienteVM
    {
        [Required(ErrorMessage = "O Campo Nome é obrigatório")]
        [StringLength(50, ErrorMessage = "O {0} deve conter de {2} até {1} caracteres.", MinimumLength = 6)]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O Campo Sexo é obrigatório")]
        [EnumDataType(typeof(Sexo), ErrorMessage = "Sexo Inválido")]
        public Sexo? Sexo { get; set; }
    }
}
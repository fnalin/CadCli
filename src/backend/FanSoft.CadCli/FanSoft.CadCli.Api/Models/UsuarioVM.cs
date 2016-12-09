using System.ComponentModel.DataAnnotations;

namespace FanSoft.CadCli.Api.Models
{
    public class UsuarioVM
    {
        [Required(ErrorMessage ="O Campo Nome é obrigatório")]
	    [StringLength(50, ErrorMessage = "O {0} deve conter de {2} até {1} caracteres.", MinimumLength = 6)]
        public string Nome { get; set; }

        [Required(ErrorMessage ="O Campo Email é obrigatório")]
        [EmailAddress(ErrorMessage = "E-mail em formato inválido.")]
        public string Email { get; set; }

        [Required(ErrorMessage ="O Campo Senha é obrigatório")]
        public string Senha { get; set; }

    }
}
using FanSoft.CadCli.Core.Contracts.Repositories;
using FanSoft.CadCli.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FanSoft.CadCli.Api.Controllers
{
    [Route("api/v1/clientes")]
    public class ClientesController :BaseController
    {
        private readonly IClienteRepository _repo;
        public ClientesController(IClienteRepository repo)
        {
            _repo = repo;
        }

        public async Task<IActionResult> Get()
        {
            var clientes =
                await _repo.ObterAsync().ConfigureAwait(false);

            return Json(clientes.Select(d=>new {
                id= d.Id,
                Nome = d.Nome,
                Sexo = d.Sexo,
                Cadastro = d.Cadastro.ToString("dd/MM/yyyy HH:mm"),
                Alteracao = d.Alteracao.ToString("dd/MM/yyyy HH:mm")
            }));
        }

        [Route("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var cliente =
                await _repo.ObterAsync(id).ConfigureAwait(false);

            if (cliente == null)
                Response.StatusCode = (int)HttpStatusCode.NotFound;

            return Json(cliente);
        }

        [HttpPost]
        [Route("")]
        public Task<IActionResult> Post([FromBody]Models.ClienteVM clienteVM)
        {
            var error = CheckModelState();
            if (error != null)
            {
                return Task.FromResult<IActionResult>(Json(error));
            }

            var cliente =
                new Cliente(clienteVM.Nome, (Sexo)clienteVM.Sexo);
            _repo.Adicionar(cliente);
            _repo.Salvar();

            Response.StatusCode = (int)HttpStatusCode.Created;
            return Task.FromResult<IActionResult>(Json(cliente));

        }

        [HttpPut]
        [Route("{id}")]
        public Task<IActionResult> Put(int id, [FromBody]Models.ClienteVM clienteVM)
        {
            var error = CheckModelState();
            if (error != null)
            {
                return Task.FromResult<IActionResult>(Json(error));
            }

            var cliente = _repo.Obter(id);
            cliente.Alterar(clienteVM.Nome, (Sexo)clienteVM.Sexo);
            _repo.Atualizar(cliente);
            _repo.Salvar();

            return Task.FromResult<IActionResult>(Json(cliente));

        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var usuario =
                await _repo.ObterAsync(id).ConfigureAwait(false);

            if (usuario == null)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
            }
            else
            {
                _repo.Excluir(usuario);
                _repo.Salvar();
            }

            return Json(usuario);
        }

    }
}

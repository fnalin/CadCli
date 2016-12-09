using FanSoft.CadCli.Core.Contracts.Repositories;
using FanSoft.CadCli.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Threading.Tasks;

namespace FanSoft.CadCli.Api.Controllers
{
    [Route("api/v1/usuarios")]
    public class UsuariosController : BaseController
    {
        private readonly IUsuarioRepository _repo;
        public UsuariosController(IUsuarioRepository repo)
        {
            _repo = repo;
        }

        public async Task<IActionResult> Get()
        {
            var usuarios =
                await _repo.ObterAsync().ConfigureAwait(false);

            return Json(usuarios);
        }

        [Route("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var usuarios =
                await _repo.ObterAsync(id).ConfigureAwait(false);

            if (usuarios == null)
                Response.StatusCode = (int)HttpStatusCode.NotFound;

            return Json(usuarios);
        }

        [HttpPost]
        [Route("")]
        public Task<IActionResult> Post([FromBody]Models.UsuarioVM usuarioVM)
        {
            var error = CheckModelState();
            if (error != null)
            {
                return Task.FromResult<IActionResult>(Json(error));
            }

            var usuario =
                new Usuario(usuarioVM.Nome, usuarioVM.Email, usuarioVM.Senha);
            _repo.Adicionar(usuario);
            _repo.Salvar();

            Response.StatusCode = (int)HttpStatusCode.Created;
            return Task.FromResult<IActionResult>(Json(usuario));

        }

        [HttpPut]
        [Route("{id}")]
        public Task<IActionResult> Put(int id, [FromBody]Models.UsuarioVM usuarioVM)
        {
            var error = CheckModelState();
            if (error != null)
            {
                return Task.FromResult<IActionResult>(Json(error));
            }

            var usuario = _repo.Obter(id);
            usuario.Alterar(usuarioVM.Nome, usuarioVM.Email, usuarioVM.Senha);
            _repo.Atualizar(usuario);
            _repo.Salvar();

            return Task.FromResult<IActionResult>(Json(usuario));

        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(Guid id)
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

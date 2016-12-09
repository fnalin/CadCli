using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;

namespace FanSoft.CadCli.Api.Controllers
{
    [Authorize()]
    public abstract class BaseController : Controller
    {

        protected IList<string> CheckModelState()
        {
            if (!ModelState.IsValid)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;

                var errorlist = new List<string>();
                foreach (var value in ModelState.Values)
                {
                    foreach (var error in value.Errors)
                        errorlist.Add(error.ErrorMessage);
                }
                return errorlist;
            }
            return null;
        }

    }
}

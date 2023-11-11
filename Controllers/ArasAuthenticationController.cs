using ArasMicroService.Model;
using Innovator.Client;
using Innovator.Client.Connection;
using MessagePack;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using StackExchange.Redis;
using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Web.Helpers;
using Role = ArasMicroService.Model.Role;

namespace ArasMicroService.Controllers
{
    [Route("api/[controller]")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ApiController]
    public class ArasAuthenticationController : ControllerBase
    {
        
        public ArasAuthenticationController(IDistributedCache cache)
        {
            ArasUtils.Instance._redisCache = cache;
        }

        [HttpPost]
        [Route("login")]
        //public string login(String username, string password, string hostname, string database, string connection)
        public LoginResult Login( User usermodel)
        {
            
            IRemoteConnection remoteConnection = ArasUtils.Instance.getLoginConnection(usermodel.username,
                                                                                       usermodel.password,
                                                                                       usermodel.hostname,
                                                                                       usermodel.database,
                                                                                       usermodel.connection);
            LoginResult loginResult = new LoginResult();
            try
            {
                if (remoteConnection == null)
                {
                    loginResult.outcome = "FAIL";
                    loginResult.message = "Login Failed";
                }
                else
                {
                    loginResult.roles = this.GetLoggedInUserRoles(usermodel.username);
                    loginResult.outcome = "OK";
                    loginResult.message = "SUCCESS";
                    

                }
            }
            catch (Exception e)
            {
                loginResult.outcome = "FAIL";
                loginResult.message =  e.Message;
            }
            finally
            {
                if (remoteConnection != null)
                {
                    remoteConnection.Logout(true);
                }
            }



            return loginResult;
        }
        [HttpGet]
        [Route("getUserRoles")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public List<string> GetLoggedInUserRoles([FromHeader(Name="username")][Required] string username)
        {
            
            List<string> roleList = new List<string>();
            IRemoteConnection conn = ArasUtils.Instance.GetRemoteConnection(username);
            try
            {
                var aml = conn.AmlContext;
                var identities = conn.Apply(new Command("<Item/>").WithAction(CommandAction.GetIdentityList)).Value.Split(',');

                foreach (var identity in identities)
                {
                    //Console.WriteLine(ident);

                    var query = $"<Item type='Identity' action='get' id='{identity}'/>";
                    //Console.WriteLine(query);
                    var roles = conn.Apply(query).Items();

                    var aliasIdentity = roles.Select(r => r.Property("is_alias").Value).ToArray();
                    Console.WriteLine(aliasIdentity[0]);
                    if (Convert.ToInt16(aliasIdentity[0]) == 0) // found role
                    {
                        var rolename = roles.Select(r => r.Property("name").Value).ToArray();
                        if (rolename[0] != "World")
                        {
                            
                            roleList.Add(rolename[0]);
                        }
                            
                    }

                }

            }
            catch (Exception e)
            {
            }

            
            return roleList;
        }
    }
}

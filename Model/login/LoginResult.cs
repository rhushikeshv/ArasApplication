using Microsoft.AspNetCore.Authentication.Cookies;
using Newtonsoft.Json;

namespace ArasMicroService.Model
{
    [JsonObject(MemberSerialization.OptIn)]
    public class LoginResult
    {
        [JsonProperty]
        public string outcome { get; set; }
        [JsonProperty]
        public string message { get; set; }
        
        [JsonProperty]
        public List<string> roles { get; set; }
    }
}



using ArasMicroService.Model.part;
using Microsoft.AspNetCore.Authentication.Cookies;
using Newtonsoft.Json;

namespace ArasMicroService.Model.part
{
    [JsonObject(MemberSerialization.OptIn)]
    public class PartResult
    {
        [JsonProperty]
        public string outcome { get; set; }
        [JsonProperty]
        public string message { get; set; }
        
        [JsonProperty]
        public List<Part> parts { get; set; }
    }
}
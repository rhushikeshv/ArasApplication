using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace ArasMicroService.Model
{
    [JsonObject(MemberSerialization.OptIn)]
    public class User
    {
        [JsonProperty]
        public string username { get; set; }
        [JsonProperty]
        public string password { get; set; }
        [JsonProperty]
        public string database { get; set; }
        [JsonProperty]
        public string hostname { get; set; }
        [JsonProperty]
        public string connection { get; set; }


    }
}

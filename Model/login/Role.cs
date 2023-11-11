using Newtonsoft.Json;

namespace ArasMicroService.Model;

[JsonObject(MemberSerialization.OptIn)]
public class Role
{
    [JsonProperty]
    public string rolename { get; set; }
}
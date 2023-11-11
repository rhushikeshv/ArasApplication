using Newtonsoft.Json;

namespace ArasMicroService.Model.part;
[JsonObject(MemberSerialization.OptIn)]
public class Part
{
    [JsonProperty]
    public string part_number { get; set; } = "";
    
    [JsonProperty]
    public string make_buy { get; set; } = "";
    
    [JsonProperty]
    public string revision { get; set; } = "";
    
    [JsonProperty]
    public string name { get; set; }= "";
    
    [JsonProperty]
    public string classification { get; set; } = "";
    
    [JsonProperty]
    public string state { get; set; } = "";
    
    [JsonProperty]
    public string cost { get; set; } = "";
    
    [JsonProperty]
    public string raw_form { get; set; } = "";

    [JsonProperty] public string id { get; set; } = "";

    [JsonProperty] public string control_type { get; set; } = "";


}
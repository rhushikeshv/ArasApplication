using System.ComponentModel.DataAnnotations;
using System.Net;
using ArasMicroService.Model.part;
using Innovator.Client;
using Innovator.Client.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Primitives;

namespace ArasMicroService.Controllers;

[Route("api/[controller]")]
[ProducesResponseType(StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
[ApiController]
public class PartController : Controller
{
    
    public PartController(IDistributedCache cache)
    {
        ArasUtils.Instance._redisCache = cache;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public Part createOrEditPart(Part inputPart,[FromHeader(Name="username")][Required] string username)
    {
        Boolean create = false;
        Part result = new Part();
        var re = Request;
        var headers = re.Headers;
       try
        {
            IRemoteConnection connection = ArasUtils.Instance.GetRemoteConnection(username);
            var aml = connection.AmlContext;

            IItem part = null;
            
            if (inputPart.id != "")
            {
                create = false;
                part = aml.Item(aml.Type("Part"), aml.Action("edit"), aml.Id(inputPart.id));
                
            }
            else
            {
                create = true;
                part = aml.Item(aml.Type("Part"), aml.Action("add"));
                
            }
            
    
            part.Property("type").Set("Part");
            part.Property("serverEvents").Set(false);
            part.Property("item_number").Set(inputPart.part_number);
            part.Property("name").Set(inputPart.name);
            part.Property("raw_form").Set(inputPart.raw_form);
            part.Property("make_buy").Set(inputPart.make_buy);
            part.Property("classification").Set(inputPart.classification);
            part.Property("control_type").Set(inputPart.control_type);
           
            
            IReadOnlyItem partFromAras = part.Apply(connection).AssertNoError().AssertItem();
            

            result.part_number = partFromAras.Property("item_number").Value;
            result.name = partFromAras.Property("name").Value;
            result.make_buy = partFromAras.Property("make_buy").Value;
            result.raw_form = partFromAras.Property("raw_form").Value;
            result.classification = partFromAras.Property("classification").Value;
            result.control_type = partFromAras.Property("control_type").Value;
            result.id = partFromAras.Property("id").Value;
            result.state = partFromAras.Property("state").Value;
            result.revision = partFromAras.Property("major_rev").Value;





        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        if (create)
            HttpContext.Response.StatusCode = 201;
        else
            HttpContext.Response.StatusCode = 200;
        
            
        
        return result;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public PartResult getParts([FromHeader(Name="username")][Required] string username)
    {
        PartResult result = new PartResult();
        List<Part> partlist = new List<Part>();
        result.parts = partlist;
        try
        {
            IRemoteConnection connection = ArasUtils.Instance.GetRemoteConnection(username);
            var results = connection.Apply(@"<Item type='Part' action='get' 
                                                                select='item_number,classification,name,raw_form,major_rev,state,id'/>");
            foreach (var item in results.Items())
            {
                Part part = new Part();
                 
                part.part_number = string.IsNullOrEmpty(item.Property("item_number").Value) ? "" : item.Property("item_number").Value; 
                part.name = string.IsNullOrEmpty(item.Property("name").Value) ? "" : item.Property("name").Value; 
                part.classification = string.IsNullOrEmpty(item.Property("classification").Value) ? "" : item.Property("classification").Value; 
                part.id = string.IsNullOrEmpty(item.Property("id").Value) ? "" : item.Property("id").Value; 
                part.raw_form = string.IsNullOrEmpty(item.Property("raw_form").Value) ? "" : item.Property("raw_form").Value; 
                part.state = string.IsNullOrEmpty(item.Property("state").Value) ? "" : item.Property("state").Value; 
                part.revision = string.IsNullOrEmpty(item.Property("major_rev").Value) ? "" : item.Property("major_rev").Value;
                
                partlist.Add(part);
            }

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            result.message = e.Message;
            result.outcome = "FAIL";
            //HttpContext.Response.StatusCode = 401;
           return result;
        }

        HttpContext.Response.StatusCode = 200;
        return result;
    }
}
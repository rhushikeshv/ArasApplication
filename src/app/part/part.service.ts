import { Injectable } from '@angular/core';
import {Part} from "./part";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PartService {
  parts:Part[] = [];
  constructor(private httpClient: HttpClient) { }

  getParts():Part[]  {
    this.httpClient.get("https://localhost:7123/api/Part").subscribe({
      next: (data: any) => {
        console.log('parts '+ data.parts);
        //this.parts = data.value;
        data.parts.forEach((dataElement : any) =>{

          let part:Part = new Part();
          part.state = dataElement["state"];
          part.id = dataElement["id"];
          part.part_number = dataElement["part_number"];
          part.revision = dataElement["revision"];
          part.make_buy = dataElement["make_buy"];
          part.classification = dataElement["classification"];
          part.state = dataElement["state"];
          part.cost = dataElement["cost"];
          part.raw_form=dataElement["raw_form"];
          part.name = dataElement["name"];
          console.log("part ", part);
          this.parts.push(part);

        })
      },
      error: (error) => {
        console.log(error)
        // this.parts = null;
      },
      complete: () => {
      }
    });
    return this.parts;
  }
  savePart(part:Part) : Observable<any>  {
    return this.httpClient.post("https://localhost:7123/api/Part",part);
  }
}

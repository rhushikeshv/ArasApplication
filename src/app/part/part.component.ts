import {Component, OnInit} from '@angular/core';
import {PartService} from "./part.service";
import {Part} from "./part";

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css'],
  providers:[PartService]
})
export class PartComponent implements OnInit{
  parts!:Part[] ;
  constructor(private partService:PartService) {

  }

  getParts() {
    this.parts = this.partService.getParts();
  }

  ngOnInit(): void {
    console.log(" Part comp init ");
    this.getParts();
  }
}

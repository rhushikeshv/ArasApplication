import {Component, OnInit} from '@angular/core';
import {PartService} from "./part.service";
import {Part} from "./part";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css'],
  providers:[PartService,MessageService,ConfirmationService]
})
export class PartComponent implements OnInit{
  parts!:Part[] ;

  partDialog!: boolean;

  part: Part;

  selectedParts!: Part[];

  make_buy! : String[];

  raw_form!: String[];

  classification!:String[];

  control_type!:String[];

  submitted!: boolean;

  isCreate!: boolean;
  constructor(private partService:PartService, private messageService: MessageService, private confirmationService: ConfirmationService) {

    this.part = { id:"",part_number:"",
                  make_buy:"",revision:"",
                  state:"",cost:"",
                  raw_form:"",name:"",
                  classification:"",
                  control_type:"",
    }

    this.make_buy =['Buy','Make'];

    this.raw_form = ['Pipe','Plate','Forging','Casting'];

    this.classification = ['Assembly','Material','Component','Software'];

    this.control_type = ['Serial','Lot/Batch','No Control'];



  }

  getParts() {
    this.parts = this.partService.getParts();
  }

  ngOnInit(): void {
    console.log(" Part comp init ");
    this.getParts();
  }

  openNew() {

    this.submitted = false;
    this.partDialog = true;
    this.isCreate = false;
    this.part = { id:"",part_number:"",
      make_buy:"",revision:"",
      state:"",cost:"",
      raw_form:"",name:"",
      classification:"",
      control_type:"",
    }
  }

  deleteSelectedParts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.parts = this.parts.filter(val => !this.selectedParts.includes(val));
        this.selectedParts = [];
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
    });
  }



  savePartToAras(create:boolean)
  {

      this.partService.savePart(this.part).subscribe(dataElement=>{
      this.part.id = dataElement["id"];
      this.part.part_number = dataElement["part_number"];
      this.part.revision = dataElement["revision"];
      this.part.make_buy = dataElement["make_buy"];
      this.part.classification = dataElement["classification"];
      this.part.state = dataElement["state"];
      this.part.cost = dataElement["cost"];
      this.part.raw_form=dataElement["raw_form"];
      this.part.name = dataElement["name"];

      if(this.findIndexById(this.part.part_number) == -1)
      {
        this.parts.push(this.part);
      }
      else {
        this.parts[this.findIndexById(this.part.part_number)] = this.part;
      }

      if(create)
       this.messageService.add({severity:'success', summary: 'Successful', detail: 'Part Created', life: 3000});
      else
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Part Updated', life: 3000});

    })
  }
  savePart() {
    this.submitted = true;

    if (this.part.part_number.trim()) {
      if (this.part.id) {
        this.savePartToAras(false);
      }
      else {
        this.part.id = "";
        this.savePartToAras(true);
      }


      this.parts = [...this.parts];
      this.partDialog = false;
      this.part = { id:"",part_number:"",
        make_buy:"",revision:"",
        state:"",cost:"",
        raw_form:"",name:"",
        classification:"",
        control_type:"",
      }

    }
  }

  findIndexById(part_number: string): number {
    let index = -1;
    for (let i = 0; i < this.parts.length; i++) {
      if (this.parts[i].part_number === part_number) {
        index = i;
        break;
      }
    }

    return index;
  }

  hideDialog() {
    this.partDialog = false;
    this.submitted = false;
  }

  editPart(part: Part) {
    this.part = {...part};
    this.partDialog = true;
    this.isCreate = true;
  }

  deletePart(part: Part) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + part.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.parts = this.parts.filter(val => val.id !== part.id);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Part Deleted', life: 3000});
      }
    });
  }


}

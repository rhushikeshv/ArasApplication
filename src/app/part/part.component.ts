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

  submitted!: boolean;
  constructor(private partService:PartService, private messageService: MessageService, private confirmationService: ConfirmationService) {

    this.part = { id:"",part_number:"",make_buy:"",revision:"",state:"",cost:"",raw_form:"",name:"",classification:""}

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

  protected readonly name = name;

  savePart() {
    this.submitted = true;

    if (this.part.part_number.trim()) {
      if (this.part.id) {
        this.parts[this.findIndexById(this.part.id)] = this.part;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Part Updated', life: 3000});
      }
      else {
        this.part.id = "";
        this.parts.push(this.part);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Part Created', life: 3000});
      }


      this.parts = [...this.parts];
      this.partDialog = false;
      this.part = { id:"",part_number:"",make_buy:"",revision:"",state:"",cost:"",raw_form:"",name:"",classification:""};

    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.parts.length; i++) {
      if (this.parts[i].id === id) {
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

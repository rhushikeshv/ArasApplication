import {Component, OnInit} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  items!: MenuItem[];

  activeItem!: MenuItem;
  constructor(private router:Router) {
  }


  ngOnInit() {
    this.items = [
      { label: 'Parts',routerLink:'part' ,routerLinkActiveOptions: { exact: true }},
      { label: 'Drawings',routerLink:'drawing' ,routerLinkActiveOptions: { exact: true }},
      { label: 'Engg Change',routerLink:'ecr',routerLinkActiveOptions: { exact: true }},
    ];

    this.activeItem = this.items[0];
  }


}

import { Component } from '@angular/core';
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NavlinkComponent} from "./navlink/navlink.component";
import {NzIconModule} from 'ng-zorro-antd/icon';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {SseService} from "../../services/sse/sse.service";
import {SSE} from "../../../types/sse/v1/sse.types";
import moment from "moment";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NzSpaceComponent,
    NavlinkComponent,
    NzSpaceItemDirective,
    NzIconModule,
    NgOptimizedImage,
    NzDrawerComponent,
    NzDrawerContentDirective,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  sseMessages: SSE[] = []

  drawerVisible:boolean = false

  constructor(
    private sseService: SseService
  ) {

    this.sseService.getUpdateObservable().subscribe(val => {
      this.sseMessages.push(val)
    })

  }



  openSideDrawer(){
    console.log("SideDrawer Open")
    this.drawerVisible = true
  }

  closeSideDrawer(){
    console.log("SideDrawer Close")
    this.drawerVisible = false
  }

  protected readonly moment = moment;
  protected readonly environment = environment;
}

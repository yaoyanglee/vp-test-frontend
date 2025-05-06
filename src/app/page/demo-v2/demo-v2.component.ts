import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {SidebarV2Component} from "../../globals/sidebar-v2/sidebar-v2.component";
import {SidebarLinkV2Component} from "../../globals/sidebar-v2/sidebar-link-v2/sidebar-link-v2.component";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-demo-v2',
  standalone: true,
  imports: [
    RouterModule,
    SidebarV2Component,
    SidebarLinkV2Component,
    NzIconDirective
  ],
  templateUrl: './demo-v2.component.html',
  styleUrl: './demo-v2.component.css'
})
export class DemoV2Component {

}

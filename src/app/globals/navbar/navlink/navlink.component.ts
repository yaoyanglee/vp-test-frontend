import {Component, Input} from '@angular/core';
import {RouterModule} from "@angular/router";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-navlink',
  standalone: true,
  imports: [
    RouterModule,
    NzButtonComponent
  ],
  templateUrl: './navlink.component.html',
  styleUrl: './navlink.component.css'
})
export class NavlinkComponent {
  @Input() href!: string
}

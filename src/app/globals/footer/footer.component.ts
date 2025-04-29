import { Component } from '@angular/core';
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {FooterExternalLinkComponent} from "./footer-external-link/footer-external-link.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NzDividerComponent,
    NzSpaceComponent,
    NzSpaceItemDirective,
    FooterExternalLinkComponent,
    NgOptimizedImage
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}

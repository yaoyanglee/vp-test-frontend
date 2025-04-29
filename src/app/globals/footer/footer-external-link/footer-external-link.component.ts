import {Component, Input, input} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-footer-external-link',
  standalone: true,
  imports: [
    NzButtonComponent
  ],
  templateUrl: './footer-external-link.component.html',
  styleUrl: './footer-external-link.component.css'
})
export class FooterExternalLinkComponent {
  @Input() href!: string
}

import {Component, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'sidebar-v2-link',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar-link-v2.component.html',
  styleUrl: './sidebar-link-v2.component.css'
})
export class SidebarLinkV2Component {

  @Input() dummySize?:'SM' | 'MD' | 'LG' | undefined
  @Input() routerLink!:string
  @Input() isExpand:boolean = false

  constructor(
    private router: Router
  ) {
  }

  setIsExpand(state:boolean){
    this.isExpand = state
  }

}

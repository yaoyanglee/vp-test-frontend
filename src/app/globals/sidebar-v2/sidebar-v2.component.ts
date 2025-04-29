import {Component, ContentChildren, OnInit, QueryList, ViewChild, ViewRef} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {SidebarLinkV2Component} from "./sidebar-link-v2/sidebar-link-v2.component";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzIconDirective
  ],
  templateUrl: './sidebar-v2.component.html',
  styleUrl: './sidebar-v2.component.css'
})
export class SidebarV2Component implements OnInit{


  private readonly SIDEBAR_PERSIST_KEY = "sidebar_persist"

  isExpand:boolean
  isExpand$:BehaviorSubject<boolean>

  @ContentChildren(SidebarLinkV2Component) sidebarItems!: QueryList<SidebarLinkV2Component>

  constructor() {

    this.isExpand$ = new BehaviorSubject<boolean>(window.localStorage.getItem(this.SIDEBAR_PERSIST_KEY)==='true')
    this.isExpand$.subscribe(val => {
      this.isExpand = val
    })

    this.isExpand$.subscribe(val => {
      this.writeToLocalStore(val)
    })
  }

  ngOnInit(){
  }

  private writeToLocalStore(val:boolean){
    window.localStorage.setItem(this.SIDEBAR_PERSIST_KEY, val?'true':'false')
  }

  toggleExpand(){
    this.isExpand$.next(!this.isExpand)
    this.sidebarItems.forEach(item => {
      item.setIsExpand(this.isExpand)
    })
  }


}

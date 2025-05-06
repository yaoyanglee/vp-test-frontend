import {Component, OnInit} from '@angular/core';
import {NzCardComponent} from "ng-zorro-antd/card";
import {environment} from "../../../environments/environment";
import axios from "axios";
import {CommonModule} from "@angular/common";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    NzCardComponent,
    CommonModule,
    NzSelectComponent,
    NzOptionComponent,
    NzButtonComponent,
    NzSpaceComponent,
    NzSpaceItemDirective,
    FormsModule,
    NzInputGroupComponent,
    NzUploadComponent,
    NzIconDirective
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent implements OnInit{

  profiles:string[]=[]
  selectedProfile:string = ""

  files:NzUploadFile[] = []

  constructor(
    private router: Router
  ) {
  }

  async fetchProfiles():Promise<void> {
    const res = await axios.get<string[]>(`${environment.BACKEND}/select/all`)
    this.profiles = res.data
  }

  ngOnInit() {
    this.fetchProfiles().catch(console.error)
  }

  submit(){
    console.log(this.files)
    if(this.selectedProfile !== ""){
      this.router.navigate([`/schedule/${this.selectedProfile}`]).catch(console.error)
    }
  }

}

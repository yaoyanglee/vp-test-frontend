import {Component, OnInit} from '@angular/core';
import {NzCardComponent, NzCardTabComponent} from "ng-zorro-antd/card";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzEmptyComponent} from "ng-zorro-antd/empty";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {CommonModule} from "@angular/common";
import {Pillbox_tabComponent} from "../../components/pillbox_tab/pillbox_tab.component";
import {NzPageHeaderComponent} from "ng-zorro-antd/page-header";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import axios from "axios";
import {environment} from "../../../environments/environment";
import {PillboxWeek} from "../../../types/pillbox/PillboxDay.types";
import {FormsModule} from "@angular/forms";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NzSkeletonComponent} from "ng-zorro-antd/skeleton";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-loader/loader-hooks";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {Observable} from "rxjs";
import {PatientData} from "../../../types/summary/summary.types";

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    NzCardComponent,
    NzCardTabComponent,
    NzTabSetComponent,
    NzTabComponent,
    NzButtonComponent,
    NzInputGroupComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzEmptyComponent,
    NzSpaceComponent,
    NzFlexDirective,
    NzSpaceItemDirective,
    CommonModule,
    Pillbox_tabComponent,
    NzPageHeaderComponent,
    NzDividerComponent,
    FormsModule,
    NzSpinComponent,
    NzSkeletonComponent,
    NzIconDirective,
    NzUploadComponent
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent implements OnInit{

  inputIndex:number = 0
  inputSelectOptions:string[] = []

  medIndex:number = 0

  selectedId:string = ""
  uploadedImage:NzUploadFile[] = []
  uploadedImageName:string = ""

  medIsExpand:boolean = false

  drugList:string[] = []
  summary:PatientData|undefined = undefined
  data:PillboxWeek = undefined

  loadingDrugList:boolean = false
  loadingSummary:boolean = false

  ngOnInit() {
    // Fetch all valid options
    const fetchOptions = async () => {
      const res = await axios.get<string[]>(`${environment.BACKEND2}/select/all`)
      this.inputSelectOptions = res.data
    }
    fetchOptions().catch(console.error)
  }

  fileUpload = (file:NzUploadFile, fileList:NzUploadFile[]):(boolean | Observable<boolean>)  => {
    this.uploadedImageName = fileList[0].name
    return true
  }

  fileDelete = (file:NzUploadFile): (boolean | Observable<boolean>) => {
    this.uploadedImageName = ""
    return true
  }

  async fetchPillbox(id:string) {
    const res = await axios.get<PillboxWeek>(`${environment.BACKEND2}/select/${id}`)
    this.data = res.data
  }

  async fetchById(){
    this.loadingDrugList=true
    const res = await axios.get<string[]>(`${environment.BACKEND2}/api/get-drugs/${this.selectedId}`)
    this.drugList = res.data
  }

  async extractImage(){
    const res = await axios.get<string[]>(
      `${environment.BACKEND2}/api/extract`,
      {params:{image:this.uploadedImageName}}
    )
    this.drugList=res.data
  }

  async fetchSummary(){
    this.loadingSummary=true
    const payload:string = this.drugList.map(drug=>drug).join(",")

    const res = await axios.get<PatientData>(
      `${environment.BACKEND2}/api/data`,
      {params: {
          prescription:payload,
          patient: this.selectedId
        }}
    )
    this.summary = res.data
    console.log(res.data)

  }

  generate(){
    // this.clearData()
    switch (this.inputIndex){
      case 0:{
        if(this.selectedId){
          this.fetchPillbox(this.selectedId).catch(console.error)
          this.fetchById()
            .then(()=>{
              this.loadingDrugList = false
              this.fetchSummary()
                .then(()=>{
                  console.log(this.summary)
                  this.loadingSummary=false
                })
            })
            .catch(console.error)

        }
        break
      }
      case 1:{
        if(!this.uploadedImageName){break}
        this.loadingDrugList=true
        this.loadingSummary=true

        this.fetchPillbox(this.uploadedImageName).catch(console.error)


        this.extractImage()
          .then(()=>{
            this.loadingDrugList=false
            this.fetchSummary()
              .then(()=>{this.loadingSummary=false})
              .catch(console.error)
          })
          .catch(console.error)
        break
      }
      default: console.error("Input source out of range!")
    }

  }

  clear() {
    this.selectedId=""
    this.uploadedImageName = ""
    this.uploadedImage = []
    this.loadingSummary = false
    this.loadingDrugList = false
    this.drugList = []
    this.summary = undefined
    this.data=undefined
  }

  clearData() {
    this.loadingSummary = false
    this.loadingDrugList = false
    this.drugList = []
    this.summary = undefined
    this.data=undefined
  }

  toggleExpandMed(){
    this.medIsExpand = !this.medIsExpand
  }

  protected readonly Object = Object;
}

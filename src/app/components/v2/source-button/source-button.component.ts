import {Component, Input, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {DataCacheService} from "../../../services/v2/data-cache/data-cache.service";
import {PatientCache} from "../../../../types/v2/cache.types";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {NgForOf, NgIf} from "@angular/common";
import {PatientidRawComponent} from "../patientid-raw/patientid-raw.component";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-source-button',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzPopoverDirective,
    NgIf,
    PatientidRawComponent,
    NgForOf,
    NzIconDirective
  ],
  templateUrl: './source-button.component.html',
  styleUrl: './source-button.component.css'
})
export class SourceButtonComponent implements OnInit{

  @Input() patientId!:string

  sourceData:PatientCache|undefined = undefined

  isVisible:boolean = false

  constructor(
    private cache: DataCacheService,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    this.cache.getPatientCache(this.patientId).then(res => this.sourceData=res)
  }

  base64ToBlob(base64:string, contentType:string) {
    const sliceSize = 512;
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
  }

  createObjectURLFromBase64(base64Data:string) {
    // Extract MIME type and base64 content from the data URL
    const matches = base64Data.match(/^data:(.+?);base64,(.+)$/);
    if (!matches) {
      throw new Error('Invalid base64 data');
    }

    const contentType = matches[1];
    const base64WithoutPrefix = matches[2];
    const blob = this.base64ToBlob(base64WithoutPrefix, contentType);
    return URL.createObjectURL(blob);
  }

  openImageInTab(base64:string){
    window.open(this.createObjectURLFromBase64(base64), "_blank")
  }


}

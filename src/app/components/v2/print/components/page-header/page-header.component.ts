import {Component, Input} from '@angular/core';
import moment from "moment";
import {PatientData} from "../../../../../../types/summary/summary.types";
import {Patient} from "../../../../../../types/v2/patient.types";

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent {

  @Input() patient!: Patient

  protected readonly moment = moment;
}

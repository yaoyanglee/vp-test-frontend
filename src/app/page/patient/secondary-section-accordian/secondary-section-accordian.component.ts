import { Component, OnInit,Input} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';


@Component({
  selector: 'app-secondary-section-accordian',
  standalone: true,
  imports: [
    NzIconModule,
    NzTableModule
  ],
  templateUrl: './secondary-section-accordian.component.html',
  styleUrl: './secondary-section-accordian.component.css',
})
export class SecondarySectionAccordianComponent implements OnInit{
  @Input() title!: string;
  @Input() subtitle?: string;
  isExpanded = false;

  ngOnInit(): void {
      
  }

  changedExpanded(){
    this.isExpanded = !this.isExpanded;
  }

}

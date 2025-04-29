import { Routes } from '@angular/router';
import {SelectComponent} from "./components/select/select.component";
// import {Pillbox_tabComponent} from "./components/schedule/schedule.component";
import {SchedulePageComponent} from "./page/schedule/schedule.component";
import {DemoComponent} from "./page/demo/demo.component";
import {DemoV2Component} from "./page/demo-v2/demo-v2.component";
import {DemoV2DashboardComponent} from "./page/demo-v2/demo-v2-dashboard/demo-v2-dashboard.component";
import {DemoV2PatientComponent} from "./page/demo-v2/demo-v2-patient/demo-v2-patient.component";
import { PatientComponent } from './page/patient/patient.component';

export const routes: Routes = [
  { path:'', redirectTo: 'select', pathMatch:'full'},
  { path:'static', component: SelectComponent },
  { path:'schedule/:id', component: SchedulePageComponent},
  {
    path:'demo', children:[
      {path: '', component: DemoComponent},
      {
        path: 'v2', component: DemoV2Component , children: [
          {path: '', component: DemoV2DashboardComponent},
          {path:'patient/:id', component: PatientComponent},
          {path: 'test', pathMatch:'full', component: DemoV2PatientComponent},
        ]
      }
    ]
  },
  { path:'**', redirectTo: 'demo/v2'},
];

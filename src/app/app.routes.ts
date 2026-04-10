import { Routes } from '@angular/router';
import { Specialists } from './specialists/specialists';
import { MyAppointmentsComponent } from './my-appointments/my-appointments';
import { MedicalCentersComponent } from './medical-centers/medical-centers';

export const routes: Routes = [
  { path: 'specialists', component: Specialists},
  { path: '', redirectTo: '/specialists', pathMatch: 'full' },
  { path: 'my-appointments', component: MyAppointmentsComponent },
  { path: 'medical-centers', component: MedicalCentersComponent }
];
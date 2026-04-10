import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Specialist } from './specialist.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {
  private apiUrl = 'http://localhost:3000/specialists';

  constructor(private http: HttpClient) {}

  //Function to get the specialists
  getSpecialists() {
    return this.http.get<{message: string, specialists: any}>(this.apiUrl)
      .pipe(
        map((responseData) => {
          return responseData.specialists.map((specialist: any) => {
            return {
              id: specialist._id,
              name: specialist.name,
              specialty: specialist.specialty,
              medicalCenter: specialist.medicalCenter,
              imageUrl: specialist.imageUrl,
              availableSlots: specialist.availableSlots
            };
          });
        })
      );
  }

  //Function to book an appointment
  bookAppointment(bookingData: any) {
    return this.http.post('http://localhost:3000/specialists/book', bookingData);
  }

  //Function to get booked appointments
  getAppointments() {
    return this.http.get<any>('http://localhost:3000/appointments');
  }

  //Function to cancel/delete a booked appointment
  cancelAppointment(id: string) {
  return this.http.delete('http://localhost:3000/appointments/' + id);
  }

  //Function to update/edit the appointment
  updateAppointment(id: string, newDate: string, newHour: string) {
  return this.http.put('http://localhost:3000/appointments/' + id, { 
    date: newDate, 
    hour: newHour 
  });
}
  //Fuction to get the medical centers
  getMedicalCenters() {
    return this.http.get<{message: string, medicalCenters: any[]}>('http://localhost:3000/medical-centers');
}
}
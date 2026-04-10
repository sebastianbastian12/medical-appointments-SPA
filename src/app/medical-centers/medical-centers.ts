import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpecialistService } from '../specialists/specialist.service';
@Component({
  selector: 'app-medical-centers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medical-centers.html',
  styleUrls: ['./medical-centers.css']
})
export class MedicalCentersComponent implements OnInit {
  selectedCenter: any = null;
  filteredSpecialists: any[] = [];
  medicalCenters: any[] = [];
  
  selectedSlots: { [key: string]: string } = {};

  constructor(
    private specialistService: SpecialistService, 
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.specialistService.getMedicalCenters().subscribe({
      next: (response: any) => {
        if (response && response['centers']) {
          this.medicalCenters = response['centers'];
        }
        this.cdr.detectChanges();
      }
    });
  }

 selectCenter(center: any) {
  this.selectedCenter = center;
  this.filteredSpecialists = center.specialists || [];
  
  this.selectedSlots = {};
  this.filteredSpecialists.forEach(doctor => {
  this.selectedSlots[doctor.name] = ''; 
  });

  this.cdr.detectChanges();
}

  onBook(doctor: any) {
    const slot = this.selectedSlots[doctor.name];

    if (!slot) {
      alert('Please select a date and time first!');
      return;
    }

    const [date, hour] = slot.split(' - ');

    const bookingData = {
      specialistId: doctor._id || this.selectedCenter._id || 'internal_specialist', 
      specialistName: doctor.name,
      medicalCenter: this.selectedCenter.center,
      date: date,
      hour: hour
    };

    console.log('Data (Check specialistId):', bookingData);

    this.specialistService.bookAppointment(bookingData).subscribe({
      next: (response) => {
        alert('Success! Your appointment has been scheduled.');
        this.selectedSlots[doctor.name] = ""; 
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error in the server:', err);
        alert('Could not save the appointment. Check terminal.');
      }
    });
  }
}
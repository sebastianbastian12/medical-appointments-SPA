import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { SpecialistService } from '../specialists/specialist.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-appointments.html',
  styleUrl: './my-appointments.css'
})
export class MyAppointmentsComponent implements OnInit {
  appointments: any[] = [];

  constructor(
    private specialistService: SpecialistService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.specialistService.getAppointments().subscribe({
      next: (data: any) => {
       
        this.appointments = data['appointments']; 
        console.log('Added appointments:', this.appointments);
        
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error getting the appointments:', err);
      }
    });
  }

  onCancel(id: string) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.specialistService.cancelAppointment(id).subscribe({
        next: (response: any) => {
          console.log('Response from the server:', response.message);
          this.appointments = this.appointments.filter(appt => appt._id !== id);
          this.cdr.detectChanges();
          alert('Appointment cancelled.');
        },
        error: (err) => {
        console.error('Error canceling the appointment:', err);
        alert('Could not cancel the appointment. Please try again.');
        }
      });
    }
  }

onEdit(appt: any) {

  this.specialistService.getMedicalCenters().subscribe({
    next: (response: any) => {
      const centers = response.centers || response;
      let foundDoctor: any = null;

      centers.forEach((center: any) => {
        const doctor = center.specialists.find((s: any) => 
          (s._id?.toString() === appt.specialistId?.toString()) || 
          (s.id?.toString() === appt.specialistId?.toString()) ||
          (s.name === appt.specialistName)
        );
        
        if (doctor) {
          foundDoctor = doctor;
        }
      });

      if (foundDoctor && foundDoctor.availableSlots) {
        appt.availableSlots = foundDoctor.availableSlots;
        appt.isEditing = true;
        appt.tempSlot = `${appt.date} - ${appt.hour}`;
        this.cdr.detectChanges();
      } else {

        this.specialistService.getSpecialists().subscribe((specialists: any[]) => {
          const docGeneral = specialists.find(s => 
            (s.id?.toString() === appt.specialistId?.toString()) || 
            (s._id?.toString() === appt.specialistId?.toString())
          );

          if (docGeneral && docGeneral.availableSlots) {
            appt.availableSlots = docGeneral.availableSlots;
            appt.isEditing = true;
            appt.tempSlot = `${appt.date} - ${appt.hour}`;
          } else {
            console.error('Could not found specualist with ID:', appt.specialistId);
            alert('Error: Could not find available slots for this specialist.');
          }
          this.cdr.detectChanges();
        });
      }
    },
    error: (err) => {
      console.error('Error getting the medical centers:', err);
      alert('Error connecting to the server.');
    }
  });
}

  onSave(appt: any) {
    if (!appt.tempSlot) return;
    const [newDate, newHour] = appt.tempSlot.split(' - ');

    this.specialistService.updateAppointment(appt._id, newDate, newHour).subscribe({
      next: (response) => {
        appt.date = newDate; 
        appt.hour = newHour;
        appt.isEditing = false;
        alert('Appointment updated successfully!');
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error updating:', err);
        alert('Could not update the appointment.');
      }
    });
  }
}
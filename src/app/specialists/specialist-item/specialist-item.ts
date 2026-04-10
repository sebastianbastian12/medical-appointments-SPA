import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Specialist } from '../specialist.model';
import { SpecialistService } from '../specialist.service';

@Component({
  selector: 'app-specialist-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './specialist-item.html',
  styleUrl: './specialist-item.css'
})
export class SpecialistItemComponent {
  @Input() specialist!: Specialist;
  selectedSlot: string = "";

  constructor(private specialistService: SpecialistService) {}

  onBook() {
    if (!this.selectedSlot) {
      alert('Please select a date and time first!');
      return;
    }

    const [date, hour] = this.selectedSlot.split(' - ');

    console.log('ID del especialista:', this.specialist.id); 

    const bookingData = {
      specialistId: this.specialist.id, 
      specialistName: this.specialist.name,
      date: date,
      hour: hour
    };

    this.specialistService.bookAppointment(bookingData).subscribe({
      next: (response) => {
        alert('Success! Your appointment has been scheduled.');
        this.selectedSlot = ""; 
      },
      error: (err) => {
        console.error('Error booking the appointment:', err);
        alert('Could not save the appointment.');
      }
    });
  }
}
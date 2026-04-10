import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialistItemComponent } from '../specialist-item/specialist-item'; 
import { SpecialistService } from '../specialist.service';
import { Specialist } from '../specialist.model';

@Component({
  selector: 'app-specialists-list',
  standalone: true,
  imports: [CommonModule, SpecialistItemComponent],
  templateUrl: './specialists-list.html',
  styleUrl: './specialists-list.css'
})
export class SpecialistsListComponent implements OnInit {
  specialists: Specialist[] = [];

  constructor(private specialistService: SpecialistService, private ChangeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.specialistService.getSpecialists().subscribe(transformedSpecialists => {
      this.specialists = transformedSpecialists;
      this.ChangeDetector.detectChanges();
    });
  }
}
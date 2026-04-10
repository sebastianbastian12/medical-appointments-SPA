import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SpecialistsListComponent } from './specialists-list/specialists-list';

@Component({
  selector: 'app-specialists',
  standalone: true,
  imports: [CommonModule, SpecialistsListComponent],
  templateUrl: './specialists.html',
  styleUrl: './specialists.css',
})
export class Specialists {

}

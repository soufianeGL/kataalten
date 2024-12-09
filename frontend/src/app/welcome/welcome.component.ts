import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/materiel/material.module';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  @Input() email: string | null = null;
}

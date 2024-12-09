import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/materiel/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class ContactComponent {
  contactForm: FormGroup;
  messageSent = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.snackBar.open('Demande de contact envoyée avec succès', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['success-snackbar'],
      });
    }
    this.contactForm.markAsPristine();
    this.contactForm.markAsUntouched();
    this.contactForm.reset();
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { MaterialModule } from '../../shared/materiel/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  standalone: true,
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  /**
   * Submits the registration form
   */
  onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      this.authService.register({ email, password }).subscribe({
        next: () => {
          alert('Registration successful! Please log in.');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
          alert('Registration failed. Please try again.');
        },
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}

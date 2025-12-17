import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Console } from '../../models/console.model';
import { ConsoleService } from '../../services/console.service';

@Component({
  selector: 'app-console-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './console-create.component.html',
  styleUrls: ['./console-create.component.css']
})
export class ConsoleCreateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private consoleService = inject(ConsoleService);

  loading = false;
  error: string | null = null;

  form: FormGroup = this.fb.group({
    manufacturer: ['', [Validators.required, Validators.maxLength(50)]],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    releaseYear: [null, [Validators.required, this.releaseYearValidator]]
  });

  onSubmit(): void {
    this.error = null;

    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(k => this.form.get(k)?.markAsTouched());
      return;
    }

    this.loading = true;
    const v = this.form.value;

    const payload: Console = {
      id: 0,
      manufacturer: String(v.manufacturer).trim(),
      name: String(v.name).trim(),
      releaseYear: Number(v.releaseYear)
    };

    this.consoleService.createConsole(payload).subscribe({
      next: created => {
        this.loading = false;
        this.router.navigate(['/consoles', created.id]);
      },
      error: err => {
        this.loading = false;
        console.error('Error creating console:', err);
        this.error = 'Failed to create console. Please try again.';
      }
    });
  }

  releaseYearValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    const year = Number(control.value);
    const currentYear = new Date().getFullYear();
    if (!Number.isFinite(year)) return { invalidYear: true };
    if (year < 1970 || year > currentYear + 1) return { invalidYear: true };
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const f = this.form.get(fieldName);
    return !!(f && f.invalid && f.touched);
  }

  getFieldError(fieldName: string): string {
    const f = this.form.get(fieldName);
    if (!f || !f.touched || !f.errors) return '';
    if (f.errors['required']) return `${this.getFieldLabel(fieldName)} is required.`;
    if (f.errors['maxlength']) return `${this.getFieldLabel(fieldName)} must not exceed ${f.errors['maxlength'].requiredLength} characters.`;
    if (f.errors['invalidYear']) return 'Release year looks invalid.';
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      manufacturer: 'Manufacturer',
      name: 'Name',
      releaseYear: 'Release Year'
    };
    return labels[fieldName] ?? fieldName;
  }
}



import { Component, inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

  loaderService = inject(LoaderService)
  isLoading = this.loaderService.isLoading$;
}

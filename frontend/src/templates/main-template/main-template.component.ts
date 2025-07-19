import { Component, Input, TemplateRef } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { SideNavComponent } from "../../layout/side-nav/side-nav.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { RouterModule } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-main-template',
  imports: [HeaderComponent,NgxSpinnerModule,NgTemplateOutlet, SideNavComponent, FooterComponent, RouterModule],
  templateUrl: './main-template.component.html',
  styleUrl: './main-template.component.scss',
  providers:[NgxSpinnerService],
   animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ],
})
export class MainTemplateComponent {

  @Input() contentTemplate!: TemplateRef<any>;
  constructor(
      private spinnerService: NgxSpinnerService
    ) { 
    }

    showSpinner(): void {
      this.spinnerService.show();
  
      setTimeout(() => {
        this.spinnerService.hide();
      }, 5000); // 5 seconds
    }

}

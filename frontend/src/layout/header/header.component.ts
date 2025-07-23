import { Component } from '@angular/core';
import { AppService } from '../../app/app.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatMenuModule, MatIconModule, NgbPopoverModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  user: string | null = ''; isPopoverOpen = false;
  constructor(private appService: AppService, private router: Router){
   this.user = localStorage.getItem("user");
  }
 onSearch(event: any) {
  debugger
    this.appService.setSearchTerm(event.data);
  }

  login() {
  this.router.navigate(['login']);
}

signOut(){

}
}

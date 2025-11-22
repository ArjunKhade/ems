import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-side-nav',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  isCollapsed = false;
  @Output() sidebarToggled = new EventEmitter<boolean>();
  constructor(private router: Router, private route: ActivatedRoute) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed);  // emit current state
  }

}

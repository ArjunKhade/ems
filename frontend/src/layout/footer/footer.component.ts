import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
currentYear: number = new Date().getFullYear();
  currentTime: string = '';

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // update every second
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleString(); // full date + time
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

  handleEvent(event:Event) {
    console.log("Function called", event.type);
    // console.log("Value", (event.target as HTMLInputElement).value);

  }

}

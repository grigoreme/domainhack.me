import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public domains: string[] = [];

  constructor() { }

  updateDomain(domain) {
    console.log(domain);
  }
  
}

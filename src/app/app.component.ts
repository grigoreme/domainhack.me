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
    const matches = this.extractMatches(domain);
  }

  extractMatches(userDomain) {
    const domains = require('../assets/domains.json');
    return Object.keys(domains)
      .filter((name) => userDomain.indexOf(name) !== -1)
      .map((name) => {
        const sponsor = domains[name].sponsor;
        return {
          name,
          sponsor
        };
      });
  }

}

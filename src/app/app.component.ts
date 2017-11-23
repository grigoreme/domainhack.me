import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public domains: any[] = [];

  constructor() { }

  /**
   * @param {String} userInput
   */
  updateDomain(userInput) {
    this.requestDomains(userInput).then((response: any[]) => {
      this.domains = response;
    });
  }

  /**
   * @param {String} userInput
   */
  requestDomains(userInput) {
    const http = require('http');
    const option = {
      hostname: 'localhost',
      path: '/' + userInput,
      port: 8000,
      method: 'GET'
    };

    return new Promise((resolve, reject) => {
      http.request(option, (resp) => {
        resp.on('data', (chunk) => {
          resolve(JSON.parse(chunk));
        });
      }).end();
    });
  }

}

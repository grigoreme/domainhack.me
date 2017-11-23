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
   * Update avalaible domains
   * @param {String} userInput
   */
  updateDomain(userInput) {
    const domains = this.extractMatches(userInput);

    this.domains = this.createDomainName(domains, userInput);
  }

  /**
   * Create valid domain names
   * @param {Any[]} availableDomains
   * @param {String} userInput
   * @returns {Object[]}
   */
  private createDomainName(availableDomains: any[], userInput: string) {
    return availableDomains.map((avalaibleDomain) => {
      const domainName = avalaibleDomain.domainName;

      if (userInput.indexOf(domainName) !== 0) {
        return Object.assign(
          {
            result: userInput.replace(new RegExp(domainName), `.${domainName}/`),
          },
          avalaibleDomain
        );
      } else {
        // Complete with xxx if string starts with valid domain extension
        const regex = `.*(${domainName}?).*`;
        return Object.assign(
          {
            result: userInput.replace(new RegExp(regex), `xxx.${domainName}/`),
          },
          avalaibleDomain
        );
      }
    });

  }

  /**
   * Getting list of avalaible domains
   * @param {String} userInput
   * @returns {Object[]}
   */
  private extractMatches(userInput: string) {
    const domains = require('../assets/domains.json');
    return Object.keys(domains)
      .filter((domainName) => userInput.indexOf(domainName) !== -1)
      .map((domainName) => {
        const sponsor = domains[domainName].sponsor;
        return {
          domainName,
          sponsor
        };
      });
  }

}

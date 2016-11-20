import { HttpClient } from 'aurelia-fetch-client';
import { TeamCityHttpClientStub } from './team-city-http-client-stub';
import { inject } from 'aurelia-framework';

@inject(HttpClient, TeamCityHttpClientStub)
export class HttpClientRouter {
    constructor(realHttpClient, teamCityHttpClientStub) {
        this.realHttpClient = realHttpClient;
        this.teamCityHttpClientStub = teamCityHttpClientStub;
    }

    fetch(url, init) {
        return url.includes('stub') ? this.teamCityHttpClientStub.fetch() : this.realHttpClient.fetch(url, init);
    }
}

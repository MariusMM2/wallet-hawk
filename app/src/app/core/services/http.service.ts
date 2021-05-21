import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    static readonly options = {
        withCredentials: true
    };

    constructor(private http: HttpClient) {
    }

    async get<T>(url, options = HttpService.options) {
        return await this.http.get<T>(url, options).toPromise();
    }

    async post<T>(url, body, options = HttpService.options) {
        return await this.http.post<T>(url, body, options).toPromise();
    }
}

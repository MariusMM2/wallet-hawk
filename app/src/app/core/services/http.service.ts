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

    async get<T>(url: string, options = HttpService.options) {
        return await this.http.get<T>(url, options).toPromise();
    }

    async post<T>(url: string, body: any | null, options = HttpService.options) {
        return await this.http.post<T>(url, body, options).toPromise();
    }

    async patch<T>(url: string, body: any | null, options = HttpService.options) {
        return await this.http.patch<T>(url, body, options).toPromise();
    }

    async put<T>(url: string, body: any | null, options = HttpService.options) {
        return await this.http.put<T>(url, body, options).toPromise();
    }

    async delete<T>(url: string, options = HttpService.options) {
        return await this.http.delete<T>(url, options).toPromise();
    }
}

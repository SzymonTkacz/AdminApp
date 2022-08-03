import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { ClientModel } from "../client-dashboard/client.model";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private clientsUrl = "http://localhost:8000/clients/"
    constructor(private http: HttpClient) {}

    addClient(data: ClientModel) {
        return this.http.post<ClientModel>(this.clientsUrl, data).pipe(map((res:any) => {
            return res
        }))
    }

    updateClient(data: ClientModel) {
        return this.http.put<ClientModel>(this.clientsUrl + data.id, data).pipe(map((res:any) => {
            return res
        }))
    }

    deleteClient(id: number) {
        return this.http.delete<any>(this.clientsUrl + id).pipe(map((res:any) => {
            return res
        }))
    }

    getClients() {
        return this.http.get<any>(this.clientsUrl).pipe(map((res:any) => {
            return res
        }))
    }
}
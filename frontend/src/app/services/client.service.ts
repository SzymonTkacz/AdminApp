import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { ClientModel } from "../client-dashboard/client.model";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    constructor(private http: HttpClient) {}

    addClient(data: ClientModel) {
        return this.http.post<ClientModel>("http://localhost:3000/clients", data).pipe(map((res:any) => {
            return res
        }))
    }

    updateClient(data: ClientModel) {
        return this.http.put<ClientModel>("http://localhost:3000/clients/" + data.id, data).pipe(map((res:any) => {
            return res
        }))
    }

    deleteClient(id: number) {
        return this.http.delete<any>("http://localhost:3000/clients/" + id).pipe(map((res:any) => {
            return res
        }))
    }

    getClients() {
        return this.http.get<any>("http://localhost:3000/clients").pipe(map((res:any) => {
            return res
        }))
    }
}
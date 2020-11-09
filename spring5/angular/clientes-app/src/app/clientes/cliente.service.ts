import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndpoint: string = 'http://localhost:8080/api/clientes';
  private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router:Router ) { }

  /* getClientes(): Observable<Cliente[]> { 
    //return of(CLIENTES);
    //return this.http.get<Cliente[]>(this.urlEndpoint);
    return this.http.get(this.urlEndpoint).pipe(
      map((response) => {
        let clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          //registerLocaleData(LocaleES, 'es');
          let datePipe = new DatePipe('es-ec');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'fullDate');
          return cliente;
        })
      })
    );
  } */

  getClientes(page: number): Observable<any> { 
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
      tap((response:any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map((response: any) => {
  
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          //registerLocaleData(LocaleES, 'es');
          let datePipe = new DatePipe('es-ec');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'fullDate');
          return cliente;
        })
        return response;
      }),
      tap(response => { 
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => { 
          console.log(cliente.nombre);
        })
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> { 
    return this.http.post(this.urlEndpoint, cliente, { headers: this.httpHeader }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => { 
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> { 
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, "error")
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> { 
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, { headers: this.httpHeader }).pipe(
      catchError(e => { 
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, { headers: this.httpHeader }).pipe(
      catchError(e => { 
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    )
  }
}

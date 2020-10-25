import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a Angular 10';
  curso: string = 'Curso Spring 5 con angular 10';
  profesor: string = 'Javier Simbaña';
}

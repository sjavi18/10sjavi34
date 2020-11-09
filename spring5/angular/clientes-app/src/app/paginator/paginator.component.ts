import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() paginator: any;
  paginas: number[];
  constructor() { }

  ngOnInit(): void {
    this.paginas = new Array(this.paginator.totalPages).fill(0).map((_valor, index) => index + 1);
  }

}

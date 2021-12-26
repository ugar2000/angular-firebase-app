import { Component, OnInit } from '@angular/core';
import {ColDef, ColGroupDef} from "ag-grid";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {
  rowData: any[] = [];
  private gridApi: any;
  private gridColumnApi: any;

  constructor(private http: HttpClient) {
  }

  columnDefs: Array<any> = [
    { field: 'name', sortable: true, filter: true },
    { field: 'id', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true },
    { field: 'details', sortable: true, filter: true },
    { field: 'image', sortable: true, filter: true },
  ];

  ngOnInit(): void {

  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log(params);
    this.http.get('http://localhost:3000/products').toPromise().then((resp: any) => {
      console.log(resp);
      resp.forEach(({name, id, price, details, image}) => {
        this.rowData.push({name, id, price, details, image: image[0].name});
      })
      params.api.setRowData(this.rowData);
    })
  }

}

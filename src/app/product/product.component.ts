import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './Product';
import * as $ from 'jquery';
import 'datatables.net';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  characters: Product[];
  constructor(private httpClient:HttpClient) { 
    this.httpClient.get('http://localhost:8983/solr/delta13/dataimport?command=delta-import')
                    .subscribe()  ;
    this.httpClient.get('http://localhost:8983/solr/delta13/select?q=*:*')
                    .subscribe(
                      (data:Product[]) => { 
                        //console.log(data['response'].docs[0]);
                        this.characters = data['response'].docs;
                       // console.log('hello'+this.characters);
                    })  ;
   
  }
  
  
  

  ngOnInit() {

 

    setTimeout(function () {
      $(function () {
        $('#example').DataTable();
      });
    }, 3000);

   
   
  }
}

import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { StoreApiService } from '../../services/store-api.service';
import { Product } from '../../model/product';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  productList:Product[]=[]

  constructor(private storeApi:StoreApiService){

  }
  ngOnInit(){
    this.storeApi.getProducts().subscribe(product =>{
      this.productList = product;
    })
  }

  addToCart(product:Product):void{
    this.storeApi.addToCart(product)
    
  }

}

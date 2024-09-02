import { Component } from '@angular/core';
import { StoreApiService } from '../../services/store-api.service';
import { Product } from '../../model/product';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf,NgFor, RouterLink,RouterLinkActive,DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems:Product[]=[];
  totalAmount:number=0;

  constructor(private storeApi:StoreApiService){}

  ngOnInit(){
    this.cartItems = this.storeApi.getCartItems();
    this.calcTotalAmount( );
  }
  calcTotalAmount(){
    this.totalAmount = this.cartItems.reduce((total,item)=> total  + (item.price * item.quantity),0)
  }

  removeProduct(product:Product):void{
    this.storeApi.removeCartItem(product)
    this.calcTotalAmount()

  }

}

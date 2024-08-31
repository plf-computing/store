import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class StoreApiService {

  private cartItems:Product[]=[]



  constructor(private http: HttpClient,private notService:NotificationsService) { }

getProducts():Observable<Product[]>{
  return this.http.get<Product[]>('https://fakestoreapi.com/products')
}
 addToCart(product:Product){
 const existingItem = this.cartItems.find(item => item.id === product.id);

 if(existingItem){
  existingItem.quantity +=1;
  this.notService.showSuccess(`${product.title} already added to cart.
    Quantity Updated: ${existingItem.quantity}`)
 }else{
  product.quantity = 1;
  this.cartItems.push(product);
  this.notService.showSuccess(`${product.title} added in the cart`)
 }
 }

 getCartItemCount():number{
  return this.cartItems.length
 }
 getCartItems():Product[]{
  return this.cartItems;
 }
}

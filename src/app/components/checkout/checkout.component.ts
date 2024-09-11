import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { StoreApiService } from '../../services/store-api.service';
import { Product } from '../../model/product';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgxPayPalModule,IPayPalConfig,
  ICreateOrderRequest  } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CartComponent,DecimalPipe,NgxPayPalModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent{
  cartItems:Product[]=[];
  totalAmount:number=0;
  public payPalConfig ? : IPayPalConfig;

  // @ViewChild('paymentRef',{static:true}) paymentRef!:ElementRef;

  constructor(private storeApi:StoreApiService,private router:Router){}

  ngOnInit(){
    this.cartItems = this.storeApi.getCartItems();
    this.calcTotalAmount( );
    this.initConfig();
    // window.paypal.Buttons().render(this.paymentRef.nativeElement)
  }
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        // onApprove: (data, actions) => {
        //     console.log('onApprove - transaction was approved, but not authorized', data, actions);
        //     actions.order.get().then(details => {
        //         console.log('onApprove - you can get full order details inside onApprove: ', details);
        //     });

        // },
        // onClientAuthorization: (data) => {
        //     console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        //     this.showSuccess = true;
        // },
        // onCancel: (data, actions) => {
        //     console.log('OnCancel', data, actions);
        //     this.showCancel = true;

        // },
        // onError: err => {
        //     console.log('OnError', err);
        //     this.showError = true;
        // },
        // onClick: (data, actions) => {
        //     console.log('onClick', data, actions);
        //     this.resetStatus();
        // }
    };
}












  calcTotalAmount(){
    this.totalAmount = this.cartItems.reduce((total,item)=> total  + (item.price * item.quantity),0)
  }

  // removeProduct(product:Product):void{
  //   this.storeApi.removeCartItem(product)
  //   this.calcTotalAmount()

  // }
  cancel(){
    this.router.navigate(['/cart'])
  }


}

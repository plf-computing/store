import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
    {
        path: '', redirectTo:'products' ,pathMatch:'full'
    },
    {
        path:'products', component:ProductsComponent
    },
    {
        path:'cart', component:CartComponent   
    },
    {
        path: 'check-out',component:CheckoutComponent
    }
    
];
 
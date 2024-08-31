import { Component } from '@angular/core';
import { StoreApiService } from '../../services/store-api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private storeApi:StoreApiService){

  }

  getCartItemCount():number{
    return this.storeApi.getCartItemCount()
  }

}

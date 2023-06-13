import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { CartService } from '../CartService/cart-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bagData: any;
  bagData1: any;
  cartItemCount: number = 0;
  addedToCart: boolean[] = [];
  cartItems: { id: number; name: string; price: number; total: number; quantity: number; description: string; image: string; }[];

  constructor(private apiService: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchBagDetails();
    // this.cartItems = this.cartService.getCartItems();
    // console.log(this.cartItems,'cartItem')
  }

  fetchBagDetails(): void {
    this.apiService.getBagDetails().subscribe(
      (bagDetails: any) => {
        this.bagData = bagDetails;
      },
      (error: any) => {
        console.error('Error fetching bag details:', error);
      }
    );

    this.apiService.getBagDetails1().subscribe(
      (bagDetails1: any) => {
        this.bagData1 = bagDetails1;
      },
      (error: any) => {
        console.error('Error fetching bag details 1:', error);
      }
    );
  }

  addToCart(item: any): void {
    const product = {
      id: item.id,
      name: item.bagName,
      price: item.bagPrice,
      total: 0,
      quantity: 0,
      description: item.bagDetails,
      image: item.bagImg
    };
    this.cartService.addToCart(product);
    this.addedToCart[item.id] = true;
    localStorage.setItem('addedItems', JSON.stringify(this.addedToCart));
    console.log(product);
  }
  
  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item);
    this.addedToCart[item.id] = false;
    localStorage.setItem('addedItems', JSON.stringify(this.addedToCart));
  }
}

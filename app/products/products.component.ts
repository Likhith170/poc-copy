import { Component, OnInit } from '@angular/core';
import { CartService } from '../CartService/cart-service.service';
import { ApiService } from '../service/api.service';


import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  bagData: any;
  bagData1: any;
  bagData2:any;
  bagData3:any;
  cartItemCount: number = 0;
  addedToCart: boolean[] = [];
  

  constructor(private apiService: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchBagDetails();
    this.cartService.getCartItemCount().subscribe((count) => {
      this.cartItemCount = count;
    });
    const addedItems = localStorage.getItem('addedItems');
    this.addedToCart = addedItems ? JSON.parse(addedItems) : [];
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
        console.log(bagDetails1,'bag')
        this.bagData1 = bagDetails1;
      },
      (error: any) => {
        console.error('Error fetching bag details 1:', error);
      }
    );

    this.apiService.getBagDetails2().subscribe(
      (bagDetails2: any) => {
        console.log(bagDetails2,'bag')
        this.bagData2 = bagDetails2;
      },
      (error: any) => {
        console.error('Error fetching bag details 2:', error);
      }
    );

    this.apiService.getBagDetails3().subscribe(
      (bagDetails3: any) => {
        console.log(bagDetails3,'bag')
        this.bagData3 = bagDetails3;
      },
      (error: any) => {
        console.error('Error fetching bag details 3:', error);
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
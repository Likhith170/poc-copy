import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../CartService/cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartItems: { id: number; name: string; price: number; total: number; quantity: number; description: string; image: string; }[] = [];
  totalPrice: number = 0;
  

  constructor(private param: ActivatedRoute, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    // Retrieve cart items from the cart service
    this.cartItems = this.cartService.getCartItems();

    this.calculateTotalAmount();
  }

  removeFromCart(index: number): void {
    // Remove item from the cart using the index
    this.cartService.removeFromCart(index);

    this.calculateTotalAmount();
  }

  increaseQuantity(item: any): void {
    this.cartService.increaseQuantity(item);
    this.calculateTotalAmount();
  }

  decreaseQuantity(item: any): void {
    this.cartService.decreaseQuantity(item);
    this.calculateTotalAmount();
  }

  calculateTotalAmount(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  goToPaymentPage() {
    this.router.navigate(['/payment'], { queryParams: { totalPrice: this.totalPrice }, });
  }
}

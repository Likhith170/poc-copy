import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';             //creating a observable for current cart item count 

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { id: number; name: string; price: number; total: number; quantity: number; description: string; image: string; }[] = []; //holds items in the cart
  private cartItemCount = new BehaviorSubject<number>(0);                         //current cart item count

  addToCart(product: { id: number; name: string; price: number; total: number; quantity: number; description: string; image: string; }) {
    const existingItem = this.cartItems.find(item => item.id === product.id);   //add item to cart
    if (existingItem) {
      existingItem.quantity += 1;                   //if item exists , then you cn add quantity in cart
      existingItem.total = existingItem.quantity * existingItem.price;
    } else {
      const newItem = { ...product, quantity: 1, total: product.price };  //if no items, adds new
      this.cartItems.push(newItem);
    }
    this.cartItemCount.next(this.cartItems.length);
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);         // used to change the contents of an array by removing or replacing existing elements or adding new elements
    this.cartItemCount.next(this.cartItems.length);
  }

  increaseQuantity(item: any) {
    const cartItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (cartItem) {
      cartItem.quantity += 1;
      cartItem.total = cartItem.quantity * cartItem.price;
    }
  }

  decreaseQuantity(item: any) {
    const cartItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      cartItem.total = cartItem.quantity * cartItem.price;
    }
  }

  getCartItems() {                       //gives no. of cart items
    return this.cartItems;
  }

  getCartItemCount() {                              //item count
    return this.cartItemCount.asObservable();
  }

  getTotalQuantity(): number {
    let totalQuantity = 0;                    //total quantity 
    for (const item of this.cartItems) {
      totalQuantity += item.quantity;
    }
    return totalQuantity;
  }

  getTotalPrice(): number {                   //total price
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.total;
    }
    return totalPrice;
  }
}

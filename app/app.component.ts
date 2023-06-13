import { Component } from '@angular/core';
import { CartService } from './CartService/cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title= 'Ecommerce'
  showDropdown: boolean = false;
  
  cartItemCount$ = this.cartService.getCartItemCount();

  constructor(private cartService: CartService,private router: Router) { }
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  onOptionSelected(selectedValue: string) {
    if (selectedValue === 'option1') {
      this.router.navigateByUrl('/products');
    } else if (selectedValue === 'option2') {
      document.getElementById("heading-container").scrollIntoView();
      this.router.navigateByUrl('/products#brand');
    }
  }
  
  
}


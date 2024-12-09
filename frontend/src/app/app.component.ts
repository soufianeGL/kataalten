import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from './shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/materiel/material.module';
import { CartItem } from './shared/models/cart-item.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentYear = new Date().getFullYear();
  cartCount$: Observable<number>;
  cartItems$: Observable<CartItem[]>;
  totalAmount$: Observable<number>;
  isCartVisible = false;

  constructor(private cartService: CartService) {
    this.cartCount$ = this.cartService.getCartCount();
    this.cartItems$ = this.cartService.getCart();
    this.totalAmount$ = this.cartService.getCart().pipe(
      map((items) => items.reduce((sum, item) => sum + item.quantity * item.product.price, 0))
    );
  }

  toggleCart(): void {
    this.isCartVisible = !this.isCartVisible;
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
  }
}

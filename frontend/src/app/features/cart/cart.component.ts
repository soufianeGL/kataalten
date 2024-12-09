import { Component } from '@angular/core';
import { CartItem } from '../../shared/models/cart-item.model';
import { CartService } from '../../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/materiel/material.module';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
  }
}

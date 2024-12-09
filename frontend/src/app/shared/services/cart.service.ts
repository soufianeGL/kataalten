import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product): void {
    const existingItem = this.cart.find((item) => item.product._id === product._id);
    console.log('existing item', existingItem, this.cart[0]?.product._id, product._id)
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.cartSubject.next(this.cart);
  }

  removeFromCart(productId: string): void {
    this.cart = this.cart.filter((item) => item.product._id !== productId);
    this.cartSubject.next(this.cart);
  }

  getCartCount(): Observable<number> {
    return this.cartSubject.asObservable().pipe(
      map((cart) => cart.reduce((total, item) => total + item.quantity, 0))
    );
  }
}

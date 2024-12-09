import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/materiel/material.module';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { PageEvent } from '@angular/material/paginator';
import { CartService } from '../../../shared/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  categories: string[] = [];
  pageSize = 10;
  currentPage = 0;

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...this.products];
        this.updatePagination();
        this.extractCategories();
      },
      error: (err) => console.error('Failed to load products', err),
    });
  }

  extractCategories(): void {
    const uniqueCategories = new Set(this.products.map((p) => p.category));
    this.categories = Array.from(uniqueCategories);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(filterValue)
    );
    this.updatePagination();
  }

  applyCategoryFilter(category: string): void {
    if (category) {
      this.filteredProducts = this.products.filter(
        (product) => product.category === category
      );
    } else {
      this.filteredProducts = [...this.products];
    }
    this.updatePagination();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product._id);
  }

  viewDetails(productId: string): void {
    console.log('View details:', productId);
  }
}

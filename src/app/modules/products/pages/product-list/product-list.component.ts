import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products : Product[] = [];

  cols: any[] = [];

  searchTerm: string = '';


  constructor(private productsService: ProductsService){}


  ngOnInit(): void {
    this.productsService.getProduct()
      .subscribe(products => this.products = products);

      this.cols = [
        { field: '#', header: 'ID' },
        { field: 'productName', header: 'Name' },
        { field: 'description', header: 'Description' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'price', header: 'Status' }
    ];
  }

  getSeverity(status: string | undefined): "success" | "warning" | "danger" | undefined {
    if (status === 'InStock') {
      return 'success';
    } else if (status === 'LowStock') {
      return 'warning';
    } else if (status === 'OutOfStock') {
      return 'danger';
    } else {
      return undefined; // Manejo del caso en que status es undefined
    }
  }


  searchProducts(): void {
    if (this.searchTerm.trim() !== '') {
      // Llama al servicio para buscar productos por ID
      this.productsService.getProductById(this.searchTerm)
        .subscribe(product => this.products = product ? [product] : []);
    } else {
      // Si el término de búsqueda está vacío, carga todos los productos
      this.loadAllProducts();
    }
  }

  private loadAllProducts(): void {
    this.productsService.getProduct()
      .subscribe(products => this.products = products);
  }


}

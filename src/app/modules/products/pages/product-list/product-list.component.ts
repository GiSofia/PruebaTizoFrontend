import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products : Product[] = [];
  cols: any[] = [];
  searchTerm: string = '';
  notFoundMessage: string = '';
  emptyTableMessage: string = '';


  constructor(private productsService: ProductsService, private toastr: ToastrService, private router: Router){}


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
        .subscribe(
          product => {
            this.products = product ? [product] : [];

            if (!product) {
              this.toastr.warning(this.notFoundMessage, 'There is no product with the id');
            }
          },
          error => {
            if (error.status === 404) {
              this.toastr.warning(this.notFoundMessage, 'There is no product with the id');
            } else {
              this.notFoundMessage = 'Error al buscar el producto.';
              this.toastr.error(this.notFoundMessage, 'Error');
            }
          }
        );
    } else {
      // Si el input de búsqueda está vacío, carga todos los productos
      this.loadAllProducts();
    }
  }


  private loadAllProducts(): void {
    this.productsService.getProduct()
      .subscribe(products => this.products = products);
  }

  deleteProduct(id: string): void {
    this.productsService.deleteProduct(id)
      .subscribe(
        success => {
          if (success) {
            this.toastr.success('Producto deleted!');
            this.loadAllProducts(); // Recarga la lista de productos después de la eliminación
          } else {
            this.toastr.error('Failed to delete');
          }
        },
        error => {
          console.error('Failed to delete:', error);
          this.toastr.error('Failed to delete');
        }
      );
  }
}

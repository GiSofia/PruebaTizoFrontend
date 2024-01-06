import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {

  public productForm = new FormGroup({
    id:            new FormControl(''),
    product_name: new FormControl(''),
    description:   new FormControl(''),
    quantity:        new FormControl(0),
    price:         new FormControl(0),
    status:       new FormControl(''),
    isActive:       new FormControl(true),
  });

  constructor(private productsService: ProductsService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute){}


  get currentProduct(): Product{
    const product = this.productForm.value as Product;

    return product;
  }

  ngOnInit() {
    //Obteniendo el id desde el parametro de la ruta
    this.route.params.subscribe(params => {
      const productId = params['id'];

      this.productsService.getProductById(productId).subscribe(
        (product) => {
          // Asignando los valores del producto al formulario
          this.productForm.reset(product);
        },
        (error) => {
          this.toastr.error(`Error getting product with id ${productId}:`, error);
        }
      );
    });
  }


  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(): void{

    if(this.productForm.invalid) return;

    if(this.currentProduct.id){
      this.productsService.updateProduct(this.currentProduct)
      .subscribe(product =>{
        this.toastr.success(`Product ${product.product_name} with id ${product.id} updated!`);
      });

      return
    }
  }
}

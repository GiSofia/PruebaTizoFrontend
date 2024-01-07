import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  public productForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
    product_name: new FormControl('', [Validators.required]),
    description:   new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    status:       new FormControl('', [Validators.required]),
    isActive:      new FormControl(true)
  });

  constructor(private productsService: ProductsService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute){}

  get currentProduct(): Product{
    const product = this.productForm.value as Product;

    return product;
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  onSubmit(): void{

    if(this.productForm.invalid) return;

    this.productsService.addProduct(this.currentProduct)
      .subscribe(product =>{
        this.toastr.success(`${product.product_name} add!`);
    });
  }

}

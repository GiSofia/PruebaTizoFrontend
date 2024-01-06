import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {
  public categoryForm = new FormGroup({
    id:            new FormControl(0),
    category_name: new FormControl(''),
  });

  constructor(private categoriesService: CategoriesService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute){}

  get currentCategory(): Category{
    const category = this.categoryForm.value as Category;

    return category;
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  onSubmit(): void{

    if(this.categoryForm.invalid) return;

    this.categoriesService.addCategory(this.currentCategory)
      .subscribe(category =>{
        this.toastr.success(`${category.category_name} add!`);
    });

    // if(this.currentProduct.id){
    //   this.productsService.updateProduct(this.currentProduct)
    //   .subscribe(product =>{

    //   });

    //   return
    // }
  }
}


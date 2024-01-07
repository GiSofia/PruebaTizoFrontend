import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';


@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent {
  public categoryForm = new FormGroup({
    id:            new FormControl(0, [Validators.required, Validators.min(1)]),
    category_name: new FormControl('', [Validators.required]),
    isActive:     new FormControl(true, [Validators.required])
  });

  constructor(private categoriesService: CategoriesService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute){}

  get currentCategory(): Category{
    const product = this.categoryForm.value as Category;

    return product;
  }

  ngOnInit() {
    //Obteniendo el id desde el parametro de la ruta
    this.route.params.subscribe(params => {
      const categoryId = params['id'];

      this.categoriesService.getCategoryById(categoryId).subscribe(
        (category) => {
          // Asignando los valores de la categoria al formulario
          this.categoryForm.reset(category);
        },
        (error) => {
          this.toastr.error(`Error getting category with id ${categoryId}:`, error);
        }
      );
    });
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(): void{

    if(this.categoryForm.invalid) return;

    if(this.currentCategory.id){
      this.categoriesService.updateCategory(this.currentCategory)
      .subscribe(category =>{
        this.toastr.success(`Product ${category.id} with id ${category.id} updated!`);
      });

      return
    }
  }
}

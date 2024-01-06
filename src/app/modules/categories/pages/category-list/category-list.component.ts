import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public categories : Category[] = [];
  cols: any[] = [];
  searchTerm: number = 0;
  notFoundMessage: string = '';
  emptyTableMessage: string = ''

  constructor(private categoriesService: CategoriesService, private toastr: ToastrService, private router: Router){}

  ngOnInit(): void {
    this.categoriesService.getCategory()
      .subscribe(categories => this.categories = categories);


      this.cols = [
        { field: '#', header: 'ID' },
        { field: 'categoryName', header: 'Category Name' }
    ];
  }

  searchCategories(): void {

    if (this.searchTerm!== null) {
      // Llama al servicio para buscar productos por ID
      this.categoriesService.getCategoryById(this.searchTerm)
        .subscribe(
          category => {
            this.categories = category ? [category] : [];

            if (!category) {
              this.toastr.warning(this.notFoundMessage, 'There is no category with the id');
            }
          },
          error => {
            if (error.status === 404) {
              this.toastr.warning(this.notFoundMessage, 'There is no category with the id');
            } else {
              this.notFoundMessage = 'Error al buscar el user.';
              this.toastr.error(this.notFoundMessage, 'Error');
            }
          }
        );
    } else {
      // Si el input de búsqueda está vacío, carga todos los productos
      this.loadAllCategories();
    }
  }


  private loadAllCategories(): void {
    this.categoriesService.getCategory()
      .subscribe(categories => this.categories = categories);
  }

  deleteCategory(id: number): void {
    this.categoriesService.deleteCategory(id)
      .subscribe(
        success => {
          if (success) {
            this.toastr.success('Category deleted!');
            this.loadAllCategories(); // Recarga la lista de categories después de la eliminación
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category.interface';
import { AuthService } from 'src/app/services/authLogin/auth.service';
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
  emptyTableMessage: string = '';
  isAdmin: boolean = false;
  showUsersOption: boolean = false;

  constructor(private categoriesService: CategoriesService, private authService: AuthService, private toastr: ToastrService, private router: Router){}

  ngOnInit(): void {
    this.categoriesService.getCategory()
      .subscribe(categories => this.categories = categories);


      this.cols = [
        { field: '#', header: 'ID' },
        { field: 'categoryName', header: 'Category Name' },
        { field: 'isActive', header: 'Active' }
    ];

    // Obtener el rol del usuario al inicializar el componente
    this.authService.isAdmin().subscribe(
      (isAdmin: boolean) => {
        this.showUsersOption = isAdmin;
      },
      (error) => {
        console.error('Error al obtener el rol del usuario.', error);
      }
    );
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
      // Si el input de búsqueda está vacío, carga todos los categorias
      this.loadAllCategories();
    }
  }


  private loadAllCategories(): void {
    this.categoriesService.getCategory()
      .subscribe(categories => this.categories = categories);
  }

  deleteCategory(id: number): void {
    this.categoriesService.getCategoryById(id).subscribe(
      (category) => {
        if (category) {
          // Cambiar el estado del producto a "inactivo"
          category.isActive = false;

          // Actualizar la categoria
          this.categoriesService.updateCategory(category).subscribe(
            () => {
              this.toastr.success('Category inactive.');
              this.loadAllCategories();
            },
            (error) => {
              this.toastr.error('Failed to update category status', error);
            }
          );
        } else {
          this.toastr.error('Category not found ');
        }
      },
      (error) => {
        this.toastr.error('Failed to fetch category');
      }
    );
  }


}

import { Component, OnInit } from '@angular/core';
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

  constructor(private categoriesService: CategoriesService){}

  ngOnInit(): void {
    this.categoriesService.getCategory()
      .subscribe(categories => this.categories = categories);


      this.cols = [
        { field: '#', header: 'ID' },
        { field: 'categoryName', header: 'Category Name' }
    ];
  }


}

import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {
  productCount: number = 0;
  activeProductCount: number = 0;
  inactiveProductCount: number = 0;

  statusChartData: any;
  isActiveChartData: any;
  chartData: any;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getProductCount().subscribe(count => {
      this.productCount = count;
      this.loadData();
    });
  }

  loadData(): void {
    // Assuming you have a service method to get counts of active and inactive products
    this.productService.getActiveProductCount().subscribe(activeCount => {
      this.activeProductCount = activeCount;
      this.inactiveProductCount = this.productCount - this.activeProductCount;

      this.chartData = {
        labels: ['Active', 'Inactive'],
        datasets: [
          {
            data: [this.activeProductCount, this.inactiveProductCount],
            backgroundColor: ['#42A5F5', '#FFA726'],
            hoverBackgroundColor: ['#64B5F6', '#FFB74D']
          }
        ]
      };
    });

    this.productService.getProduct().subscribe(products => {
      const inStockCount = products.filter(product => product.status === 'InStock').length;
      const lowStockCount = products.filter(product => product.status === 'LowStock').length;
      const outOfStockCount = products.filter(product => product.status === 'OutOfStock').length;

      this.statusChartData = {
        labels: ['InStock', 'LowStock', 'OutOfStock'],
        datasets: [
          {
            data: [inStockCount, lowStockCount, outOfStockCount],
            backgroundColor: ['#42A5F5', '#FFA726', '#EF5350'],
            hoverBackgroundColor: ['#64B5F6', '#FFB74D', '#E57373']
          }
        ]
      };
    });
  }
}

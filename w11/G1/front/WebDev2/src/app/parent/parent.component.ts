import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';
import {ICategory, IProduct} from '../shared/models/category';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit, OnDestroy {

  public subTitle = '';
  public array2: any[] = [];

  public categories: ICategory[] = [];
  public loading = false;

  public interval;
  public i = 0;

  public products: IProduct[] = [];

  constructor(private provider: ProviderService) { }

  ngOnInit() {

    this.provider.getCategories().then(res => {
      this.categories = res;
      setTimeout(() => {
        this.loading = true;
      }, 2000);
    });

  }

  getProducts(category: ICategory) {
    this.provider.getCategoryProducts(category.id).then(res => {
      this.products = res;
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';
import {ICategory, IProduct} from '../shared/models/models';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit, OnDestroy {

  public output = '';
  public stringArray: string[] = [];

  public categories: ICategory[] = [];
  public loading = false;

  public products: IProduct[] = [];

  public interval;
  public i = 0;

  constructor(private provider: ProviderService) { }

  ngOnInit() {

    this.interval = setInterval(() => {
      this.i++;
    }, 1000);

    this.provider.getCategories().then(res => {
      this.categories = res;
      setTimeout(() => {
        this.loading = true;
      }, 2000);
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getProducts(category: ICategory) {
    this.provider.getProducts(category).then(res => {
      this.products = res;
    });
  }

  sendMessageByService() {
    this.provider.sendMessage.emit('This message From Parent Component');
  }

}

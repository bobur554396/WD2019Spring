import {Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {ICategory, IProduct} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }

  getCategories(): Promise<ICategory[]> {
    return this.get('http://localhost:8000/shop/categories/', {});
  }

  getCategoryProducts(id: number): Promise<IProduct[]> {
    return this.get(`http://localhost:8000/shop/categories/${id}/products/`, {});
  }

}

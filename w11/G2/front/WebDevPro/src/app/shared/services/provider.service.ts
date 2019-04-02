import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {ICategory, IProduct} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);
  }

  getCategories(): Promise<ICategory[]> {
    return this.get('http://localhost:8000/api/categories/', {});
  }

  getProducts(category: ICategory): Promise<IProduct[]> {
    return this.get(`http://localhost:8000/api/categories/${category.id}/products/`, {});
  }

}

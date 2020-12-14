import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Product } from "../models/product.model";

@Injectable()
export class CartService {
  _items: Product[] = [];
  private countSource = new BehaviorSubject<any>({ Count: this._items.length });
  private itemsSource = new BehaviorSubject<Array<Product>>(this._items);

  public count = this.countSource.asObservable();
  public items = this.itemsSource.asObservable();

  constructor(private http: HttpClient) {}

  addToCart(product) {
    var tmpVal = this.itemsSource.getValue();
    tmpVal.push(product);

    this.itemsSource.next(tmpVal);
    this.countSource.next(
      this.getCountObject(this.itemsSource.getValue().length)
    );
  }

  getItems() {
    return this.itemsSource.getValue();
  }

  clearCart() {
    this._items = [];
    this.itemsSource.next(this._items);
    this.countSource.next(
      this.getCountObject(this.itemsSource.getValue().length)
    );
    return this.getItems();
  }

  getShippingPrices() {
    return this.http.get("/assets/shipping.json");
  }

  private getCountObject(val) {
    return { Count: val };
  }
}

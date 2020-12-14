import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { CartService } from "../services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  checkoutForm;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: "",
      address: ""
    });
  }

  empty() {
    this.cartService.clearCart();
  }

  onSubmit(customerData) {
    this.empty();
    this.checkoutForm.reset();
    console.warn("Your order has been submitted", customerData);
  }

  ngOnInit() {}
}

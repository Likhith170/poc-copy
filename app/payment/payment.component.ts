import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  fullName: string;
  mobile: string;
  country: string;
  address: string;
  paymentMethod: string;
  totalPrice: number = 0;
  orderPlaced: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.totalPrice = params['totalPrice'];
    });
  }

  proceedToPayment(paymentForm: NgForm) {
    if (paymentForm.valid) {
      this.fullName = paymentForm.value.fullName;
    this.mobile = paymentForm.value.mobile;
    this.country = paymentForm.value.country;
    this.address = paymentForm.value.address;
    this.paymentMethod = paymentForm.value.paymentMethod;

    // Set orderPlaced to true to display the order placed message
    this.orderPlaced = true;
  }
}
  }


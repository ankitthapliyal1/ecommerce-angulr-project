import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
declare var Razorpay:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  message:any = "Not Yet started"
  paymentId = "";
  error  = "";

  orderid:string = '';
  products: any;
  baseurl = this.api.baseUrl;
  grandtotal = 0;
  subtotal = 0;
  delivery = 0;

  // keyid: rzp_test_sk5DE8KRvImc5A
  // keysecret: 681aGWed2a32iV0fKJZnr17G

  options = {
    "key": "rzp_test_sk5DE8KRvImc5A",
    "amount": "200",
    "name": "Ankit Thapliyal",
    "description": "Ankit E-Commerce Payment",
    "image": "assets/images/person2.jpg",
    "order_id": "",
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  constructor(protected router: Router, private api: ApiService) {

  }

  ngOnInit(): void {
    if (localStorage.getItem("usertype") == null) {
      this.router.navigate(['/login'])
    }
    if (localStorage.getItem("usertype") != "user") {
      this.router.navigate(['/login'])
    }
    this.bind()
  }

  bind() {
    this.products = JSON.parse(localStorage.getItem("products") || "[]");
    this.subtotal = 0;
    this.grandtotal = 0;
    this.delivery = 0;
    for (let i = 0; i < this.products.length; i++) {
      this.subtotal += this.products[i].price * this.products[i].quantity;
    }
    this.grandtotal = this.subtotal + this.delivery;

    if (this.products.length == 0) {
      this.router.navigate(['/'])
    }
  }

  onSubmit(data: any) {

    let orderproducts = new Array();
    this.products.forEach((product: any) => {
      let orderproduct = {
        productid: product.id,
        name: product.name,
        color: product.color,
        size: product.size,
        quantity: product.quantity,
        price: product.price,
        total: product.quantity * product.price
      }
      orderproducts.push(orderproduct);
    });

    // console.log(data.value)
    let userid = localStorage.getItem('id')
    // console.log(userid)

    let object = {
      userid: userid,
      address: data.value.address,
      city: data.value.city,
      state: data.value.state,
      pincode: data.value.pincode,
      totalamount: this.subtotal,
      shipmentamount: this.delivery,
      billamount: this.grandtotal,
      products: orderproducts
    };

    this.api.post("order/place", {data: object}).subscribe((res:any)=>{
      // console.log(res)
      this.orderid = res.data._id
      this.paynow()
      console.log(this.orderid)
    })

  }


  paynow() {
    this.paymentId = '';
    this.error = '';
    this.options.amount = (this.grandtotal * 100).toString();
    this.options.prefill.name = localStorage.getItem("name") || "";
    this.options.prefill.email = localStorage.getItem("email") || "";
    this.options.prefill.contact = "";
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
      //this.message = "Payment Failed";
      // Todo - store this information in the server
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      //this.error = response.error.reason;
    }
    );
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.message = "Success Payment";
    //Call Mark Paid here
    this.api.post("order/markpaid", {data:{id:this.orderid}}).subscribe((result:any)=>{
      if(result.status === "success"){
        this.router.navigate(['/ordersuccess']);
      }
      else{
          alert(result.data);
      }
    });

  }

}

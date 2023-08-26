import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  orders:any;


  constructor(private api:ApiService){ }

  ngOnInit(): void{

    this.api.post("user/orders", {data:{userid:localStorage.getItem('id')}}).subscribe((res:any)=>{
      this.orders = res.data
      this.orders = this.orders.filter((order:any)=>{
        if(order.status == "paid")
        return true;
      else
        return false 
      })
    })
  }

  
}

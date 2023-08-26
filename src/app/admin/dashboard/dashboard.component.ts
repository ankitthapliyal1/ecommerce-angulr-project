import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  orders:any;
  users:any


  constructor(private api:ApiService){ }

  ngOnInit(): void{

    this.api.post("admin/orders", {data:{userid:''}}).subscribe((res:any)=>{
      this.orders = res.data
      this.orders = this.orders.filter((order:any)=>{
        if(order.status == "paid")
        return true;
      else
        return false 
      })
      console.log(this.orders)
    })

    this.api.post("admin/users", {data:{userid:''}}).subscribe((res:any)=>{
      this.users = res.data
      
    })
  }
}

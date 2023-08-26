import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  
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

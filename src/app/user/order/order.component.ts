import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  
  orders:any;
  order:any;
  id:any;
  name:any


  constructor(private api:ApiService, private route:ActivatedRoute){ }

  ngOnInit(): void{
    this.name = localStorage.getItem('name')

    this.id = this.route.snapshot.paramMap.get('id')

    this.api.post("user/orders", {data:{userid:localStorage.getItem('id')}}).subscribe((res:any)=>{
      this.orders = res.data
      this.orders = this.orders.filter((order:any)=>{
        if(order._id == this.id)
        
        return true;
      
      else
        return false 
      });
      this.order = this.orders[0];
    })
  }


}

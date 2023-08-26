import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  baseurl = this.api.baseUrl
  products: any

  constructor(private api: ApiService) { }
  // component lifecycle in angular

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.api.post("product/list", { data: { pcid: "" } }).subscribe((res: any) => {
      console.log(res)
      this.products = res.data
    })
  }



  onDelete(id: any) {
    console.log(id)
    if(confirm('Sure to delete')){
    this.api.post("product/delete", { data: { id: id } }).subscribe((res: any) => {
      console.log(res)
      if(res.status == "success"){
        this.getProducts()
      }
    })
   }
  }


}

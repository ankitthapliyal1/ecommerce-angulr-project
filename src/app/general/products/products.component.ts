import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  id: any
  category: any
  products: any
  categoryid:any
  baseurl = this.api.baseUrl

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.categoryid = this.route.snapshot.paramMap.get("categoryid");

    this.productList()

  }

  productList(){

    this.api.post("productcategory/get", {data:{id:this.categoryid}}).subscribe((res:any)=>{
      console.log(res)
      this.category = res.data
      console.log(this.category)
    })


    this.api.post("product/list", {data:{pcid:this.categoryid}}).subscribe((res:any)=>{
      console.log(res)
      this.products = res.data
    })
  }

}

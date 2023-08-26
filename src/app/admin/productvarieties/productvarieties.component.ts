import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-productvarieties',
  templateUrl: './productvarieties.component.html',
  styleUrls: ['./productvarieties.component.css']
})
export class ProductvarietiesComponent {


  productVarities: any = {};

  product: any = {}

  id: any

  baseurl = this.api.baseUrl


  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getproductbyId()
  }

  getproductbyId() {
    this.api.post("product/get", { data: { id: this.id } }).subscribe((res: any) => {
      console.log(res)
      this.product = res.data;
    })
  }


  onSubmit(form: any) {
    if (form.valid) {

      let data = {
        id: this.id,
        variety: this.productVarities
      }
      console.log(data)


      this.api.postdata("product/savevariety", { data: data }).subscribe((res: any) => {
        console.log(res);
        this.getproductbyId()
      });

    }
  }

  onDelete(variety: any) {
    console.log(this.product.varieties)
  
    if (confirm('Sure to delete')) {
      let data = {
        id: this.id,
        variety: variety
      }
      console.log(data)


      this.api.postdata("product/deletevariety", { data: data }).subscribe((res: any) => {
        console.log(res);
        this.getproductbyId()
      });
    }
  }

 

}

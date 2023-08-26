import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  product: any = {}; // Initialize an empty object to hold form data
  file: any;

  id:any 

  baseurl = this.api.baseUrl

  categories: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this. getbyid()
    }
    

    this.api.post("productcategory/list", {}).subscribe((res:any)=>{
      this.categories = res.data
    })

  }

  getbyid(){
    this.api.post("product/get",{data:{id:this.id}}).subscribe((res:any)=>{
      console.log(res.data)
      this.product = res.data
    })
  }


  imageChanged(event: any) {
    this.file = event.target.files[0] as File;
  }

  onSubmit(form: any) {
    if (form.valid) {
      const formData: FormData = new FormData();
      if (this.product._id) {
        formData.append('id', this.product._id);
        formData.append('pcid', this.product.pcid);
        formData.append('name', this.product.name);
        formData.append('description', this.product.description);
        formData.append('specification', this.product.specification);
        formData.append('mrp', this.product.mrp);
        formData.append('price', this.product.price);
        formData.append('instock', this.product.instock);
        formData.append('isactive', this.product.isactive);
        formData.append('file', this.file);
      } else {
       
        formData.append('pcid', this.product.pcid);
        formData.append('name', this.product.name);
        formData.append('description', this.product.description);
        formData.append('specification', this.product.specification);
        formData.append('mrp', this.product.mrp);
        formData.append('price', this.product.price);
        formData.append('instock', this.product.instock);
        formData.append('isactive', this.product.isactive);
        formData.append('file', this.file);
      }

      console.log(this.product, this.file)

      this.api.postdata("product/save", formData).subscribe((res: any) => {
        console.log(res);
        if(res.status == "success"){
          this.router.navigate(['/admin/products'])
        }
       

      });

    }
  }

  onDelete(id: any) {
    // console.log(id)
    if (confirm('Sure to delete')) {
      let data = {
        id: id
      }
      this.api.postdata("productproduct/delete", { data: data }).subscribe((res: any) => {
        // console.log(res)

      })
    }
  }

  onEdit(id: any) {
    let data = {
      id: id
    }
    // console.log()
    this.api.postdata("productproduct/get", { data: data }).subscribe((res: any) => {
      // console.log(res)
      this.product = res.data
      console.log(this.product)
    })



  }


}

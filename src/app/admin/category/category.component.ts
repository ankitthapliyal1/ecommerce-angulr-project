import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  category: any = {}; // Initialize an empty object to hold form data
  file: any;

  baseurl = this.api.baseUrl

  categories: any;

  constructor(private api: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getdata()

  }

  getdata() {
    this.api.post("productcategory/list", {}).subscribe((res: any) => {
      console.log(res.data)
      this.categories = res.data
    });


  }


  imageChanged(event: any) {
    this.file = event.target.files[0] as File;
  }

  onSubmit(form: any) {
    if (form.valid) {
      const formData: FormData = new FormData();
     if(this.category._id){
      formData.append('id', this.category._id);
      formData.append('name', this.category.name);
      formData.append('srno', this.category.srno);
      formData.append('file', this.file);
     }else{
      formData.append('name', this.category.name);
      formData.append('srno', this.category.srno);
      formData.append('file', this.file);
     }
     
      this.api.postdata("productcategory/save", formData).subscribe((res: any) => {
        console.log(res);
        this.getdata();
      });

    }
  }

  onDelete(id: any) {
    // console.log(id)
   if(confirm('Sure to delete')){
    let data = {
      id: id
    }
    this.api.postdata("productcategory/delete", { data: data }).subscribe((res: any) => {
      // console.log(res)
      this.getdata();
    })
   }
  }

  onEdit(id: any) {
    let data = {
      id: id
    }
    // console.log()
    this.api.postdata("productcategory/get", { data: data }).subscribe((res: any) => {
      // console.log(res)
this.category = res.data    
console.log(this.category)  
    })
   

  
  }



}








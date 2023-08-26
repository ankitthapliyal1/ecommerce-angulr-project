import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  adminloggedin = false;
  userloggedin = false;
  username = ''
  categories:any;

  cartcount:any

  constructor(private api : ApiService, private router:Router){}

  ngOnInit(): void {
     if(localStorage.getItem("usertype")=="admin"){
      this.adminloggedin = true
     }
     if(localStorage.getItem("usertype")=="user"){
      this.userloggedin = true;
      this.username = localStorage.getItem("name")||"";
     }

     this.api.post("productcategory/list", {}).subscribe((res:any)=>{
     this.categories = res.data;
     })

     if(localStorage.getItem("products") !=null){
      let products = JSON.parse(localStorage.getItem("products") || "[]")
      this.cartcount = products.length
      console.log(this.cartcount)
     }
  }

  logout(){
    localStorage.clear()
    window.location.replace('/')
  }

}

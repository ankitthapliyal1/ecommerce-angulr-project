import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message:any

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(data:any){
 console.log(data.value)
 this.api.post("user/login", {data:data.value}).subscribe((res:any)=>{
  console.log(res)
  if (res.status == "success") {
    localStorage.setItem("usertype", "user");
    localStorage.setItem("name", res.data.name);
    localStorage.setItem("email", res.data.email);
    localStorage.setItem("id", res.data._id);

    window.location.replace('/checkout')

  }
  else  {
   
    this.message ="Wrong username and password"
    console.log(this.message)

  }
 })
  }
}

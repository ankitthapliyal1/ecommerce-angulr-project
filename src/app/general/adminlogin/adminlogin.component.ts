import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {

  formdata: any
  message:any = "";

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    window.scroll(0,0)
    this.formdata = new FormGroup(
      {
        username: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
      }
    )
  }

  onSubmit(val:any){
    console.log(val)
    this.api.post("admin/login", {data:val}).subscribe((result:any)=>{
      console.log(result);
      if(result.data.status == "success"){
        localStorage.setItem("usertype", "admin");
        window.location.replace("/admin/dashboard")
      }
      else{
        this.message = "Username or Password is wrong"
      }
    },(err)=>{
      console.log(err);
    })
  }

}

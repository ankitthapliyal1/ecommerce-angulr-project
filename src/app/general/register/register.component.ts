import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  message: any

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  onSubmit(data: any) {

    if (data.value.password != data.value.cpassword) {
      alert('Password and confirm password should be same')
    } else {
    
    
      this.api.post("user/register", { data: data.value }).subscribe((res: any) => {
        // console.log(res.status, res.data)
        
        if (res.status == "success") {
          localStorage.setItem("usertype", "user");
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("id", res.data._id);

          window.location.replace('/checkout')

        }
        else  {
          alert(res.data)
          this.message = res.data
          console.log(this.message)

        }
      })
    }
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(){ }

  ngOnInit(): void{

  }

  logout(){
    if(confirm("sure to logout")){
      localStorage.clear();
      window.location.replace("/")
    }

  }

}

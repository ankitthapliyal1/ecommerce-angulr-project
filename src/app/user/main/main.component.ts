import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {


  constructor(protected router: Router, private api: ApiService) {

  }

  ngOnInit(): void {
    if (localStorage.getItem("usertype") == null) {
      this.router.navigate(['/login'])
    }
    if (localStorage.getItem("usertype") != "user") {
      this.router.navigate(['/login'])
    }
  }
}

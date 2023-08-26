import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  categories:any
  baseurl = this.api.baseUrl

  constructor(private api:ApiService){}

  ngOnInit(): void {
        this.api.post("productcategory/list", {}).subscribe((res:any)=>{
    this.categories = res.data;
    });

 }
}

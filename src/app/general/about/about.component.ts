import { Component } from '@angular/core';

interface DropdownOption {
  costpernode: string;
  cpu: string;
  memory: string;
  storage: string;
  bandwidth: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {



  constructor() { }

  ngOnInit(): void {
  }

  
}

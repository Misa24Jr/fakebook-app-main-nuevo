import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLink]
})
export class NavBarComponent  implements OnInit {
@Input() params: string;
  constructor() {
    this.params = '';
  }

  ngOnInit() {
    console.log(this.params)
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLink, RouterLinkActive]
})
export class NavBarComponent  implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}

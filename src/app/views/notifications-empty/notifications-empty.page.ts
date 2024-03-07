import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent } from 'src/app/components/others/nav-bar/nav-bar.component';

@Component({
  selector: 'app-notifications-empty',
  templateUrl: './notifications-empty.page.html',
  styleUrls: ['./notifications-empty.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavBarComponent]
})
export class NotificationsEmptyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

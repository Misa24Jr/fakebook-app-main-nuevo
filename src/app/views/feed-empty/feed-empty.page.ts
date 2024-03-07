import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent } from 'src/app/components/others/nav-bar/nav-bar.component';

@Component({
  selector: 'app-feed-empty',
  templateUrl: './feed-empty.page.html',
  styleUrls: ['./feed-empty.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavBarComponent]
})
export class FeedEmptyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-search',
  templateUrl: './btn-search.component.html',
  styleUrls: ['./btn-search.component.scss'],
  standalone: true
})
export class BtnSearchComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  handleUserClick() {
    console.log('User clicked');
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent } from 'src/app/components/others/nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { alert } from 'src/app/utils/alert';
import { GetResult, Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.page.html',
  styleUrls: ['./notifications-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavBarComponent]
})
export class NotificationsViewPage implements OnInit {

  token: GetResult ;
  photos: string[] = [];

  constructor(private router: Router) {
    this.token = { value: ''};
  }

  async ngOnInit() {
    this.token = await Preferences.get({ key: 'token' });
    this.getFriendRequests();
  }

  async getFriendRequests() {
    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/friends/getRequests', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${this.token.value}` }
      });

      if(response.status !== 200) {
        //render the page with no notifications
        return alert('Error!', 'Server error getting your friend requests', ['OK']);
      }

      const data = await response.json();

      if(data.length === 0){
        //render the page with no notifications
        console.log('No friend requests');
      }

      return console.log(data);
    } catch (error) {
      alert('Error!', 'Unable to get your friend requests', ['OK']);
      return this.router.navigate(['/feed']);
    }
  }

  async handleAcceptDeclineClick(answer: boolean) {
    try {
      const applicantId = ''; // get the applicant id from the notification
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/friends/answerRequest', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token.value}`,
        },
        body: JSON.stringify({
          applicant: applicantId,
          answer: answer
        })
      });

      if(response.status !== 200) return alert('Error!', 'Server error trying to accept/decline the friend request', ['OK']);

      return; //refresh the notifications deleting the accepted/declined request
    } catch (error) {
      return alert('Error!', 'Unknown trying to accept/decline the friend request', ['OK']);
    }
  }
}

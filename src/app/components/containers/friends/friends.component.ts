import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences, GetResult } from '@capacitor/preferences';
import { alert } from 'src/app/utils/alert';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
  standalone: true
})
export class FriendsComponent  implements OnInit {
  token: GetResult ;
  photos: string[] = [];

  @Input () name: string = '';

  constructor(private router: Router) { 
    this.token = {value:''}
   }

  async ngOnInit() { 
    this.token = await Preferences.get({key: 'token'})
    this.getFriendRequest();
   }

   async getFriendRequest(){
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

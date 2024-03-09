import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Storage, ref } from '@angular/fire/storage';
import { ModalComponent } from '../../others/modal/modal.component';
import { SwitchService } from 'src/services/switch.service';
import { alert } from 'src/app/utils/alert';
import { GetResult, Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [CommonModule, ModalComponent]
})
export class PostComponent  implements OnInit {
  likeClicked: boolean;
  favoriteClicked: boolean;
  modalOpen: boolean;
  token: GetResult ;

  @Input() _id: string = '';
  @Input() description:string = '';
  @Input() name: string = '';
  @Input() images: string[] = [];
  @Input() date: string = '';
  @Input() liked: boolean = false;
  @Input() favorited: boolean = false;

  constructor(private storage: Storage, private modalSS: SwitchService) {
    this.images = [];
    this.likeClicked = false;
    this.favoriteClicked = false;
    this.modalOpen = false;
    this.token = { value: '' };
    //this.date = new Date(this.date).toLocaleDateString('en-GB');
  }


  async ngOnInit() {
    this.token = await Preferences.get({ key: 'token' });
    this.modalSS.$modal.subscribe((value)=>{this.modalOpen = value});
    this.likeClicked = this.liked;
    this.favoriteClicked = this.favorited;
  }

  modalOpenHandler() {
    this.modalOpen = true;
  }

  async onLikeClick() {
    try {
      if(this.likeClicked) {
        const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/likes/dislike', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${this.token.value}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ targetId: this._id })
        });

        if(response.status !== 200) return alert('Error!', 'Server error disliking post', ['OK']);

        return this.likeClicked = !this.likeClicked;;
      } else {
        const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/likes/like', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token.value}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ targetId: this._id })
        });

        if(response.status !== 200) return alert('Error!', 'Server error liking post', ['OK']);

        return this.likeClicked = !this.likeClicked;;
      }
    } catch (error) {
      return alert('Error!', 'Unable to like post', ['OK']);
    }
  }

  onFavoriteClick() {
    this.favoriteClicked = !this.favoriteClicked;
  }
}

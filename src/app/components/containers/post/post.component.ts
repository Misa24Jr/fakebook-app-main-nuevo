import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Storage} from '@angular/fire/storage';
import { ModalComponent } from '../../others/modal/modal.component';
import { SwitchService } from 'src/services/switch.service';
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
  }


  async ngOnInit() {
    this.token = await Preferences.get({ key: 'token' });
    this.modalSS.$modal.subscribe((value)=>{this.modalOpen = value});
  }

  modalOpenHandler() {
    this.modalOpen = true;
  }
  onFavoriteClick() {
    this.favoriteClicked = !this.favoriteClicked;
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Storage, ref } from '@angular/fire/storage';
import { listAll, getDownloadURL } from '@firebase/storage';
import { alert } from 'src/app/utils/alert';
import { ModalComponent } from '../../others/modal/modal.component';
import { SwitchService } from 'src/services/switch.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [CommonModule, ModalComponent]
})
export class PostComponent  implements OnInit {
   images: string[];
   likeClicked: boolean;
   favoeiteClicked: boolean;
   modalOpen: boolean;

   @Input() description:string = '';
    @Input() name: string = '';
    @Input() date: string = '';

  constructor(private storage: Storage, private modalSS: SwitchService) {
    this.images = [];
    this.likeClicked = false;
    this.favoeiteClicked = false;
    this.modalOpen = false;

   }

  ngOnInit() {
    this.getImages();
    this.modalSS.$modal.subscribe((value)=>{this.modalOpen = value});
    // this.getFriendPosts();
   }

   modalOpenHandler() {
    this.modalOpen = true;
   }

   onLikeClick() {
    this.likeClicked = !this.likeClicked;
    // this.favoeiteClicked = false;
  }

  onFavoriteClick() {
    this.favoeiteClicked = !this.favoeiteClicked;
    // this.likeClicked = false;
  }

  getImages(){
    const imgRef = ref(this.storage, 'images');

    listAll(imgRef)
    .then(async response => {
        //console.log(response);
        this.images = [];
        for(let item of response.items){
          const url = await getDownloadURL(item)
          this.images.push(url);
          // console.log(url);
        }
    })
    .catch(error => console.log(error));
  }

}

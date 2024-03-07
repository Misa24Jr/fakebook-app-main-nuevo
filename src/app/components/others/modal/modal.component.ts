import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SwitchService } from 'src/services/switch.service';
import { InputCommentsComponent } from '../input-comments/input-comments.component';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLink, InputCommentsComponent]
})
export class ModalComponent  implements OnInit {
  likeClicked = false;
  constructor(private modalSS: SwitchService) { }

  ngOnInit() {}

  closeModal(){
    this.modalSS.$modal.emit(false);
  }

  onLikeClick() {
    this.likeClicked = !this.likeClicked;
    // this.favoeiteClicked = false;
  }

}

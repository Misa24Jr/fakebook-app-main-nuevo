import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SwitchService } from 'src/services/switch.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLink]
})
export class ModalComponent  implements OnInit {

  constructor(private modalSS: SwitchService) { }

  ngOnInit() {}

  closeModal(){
    this.modalSS.$modal.emit(false);
  }

}

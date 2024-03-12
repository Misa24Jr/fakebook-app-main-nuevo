import { Component, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-input-comments',
  templateUrl: './input-comments.component.html',
  styleUrls: ['./input-comments.component.scss'],
  standalone: true
})
export class InputCommentsComponent  implements OnInit {

  uploadImage(event: any){
    const file = event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file)
    .then(response => console.log(response))
    .catch(error => console.log(error));
  }



  constructor(private storage: Storage) { }

  ngOnInit() {}

}

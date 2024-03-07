import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage'

@Component({
  selector: 'app-new-post-view',
  templateUrl: './new-post-view.page.html',
  styleUrls: ['./new-post-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})

export class NewPostViewPage implements OnInit {
  images: string[];
  textInput: string;
  characters: any;
  countImg: number;


  uploadImage(event: any){
    const file = event.target.files[0];
    console.log(file);


    const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file)
    .then(response => console.log(response))
    .catch(error => console.log(error));


  }
  constructor(private storage: Storage) { 
    this.textInput = '';
    this.characters = '';
    this.images = [];
    this.countImg = 0;

   }

  ngOnInit() {
    this.getImages();
  }

  countCharacters(){
    this.characters = this.textInput.length;
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
        this.countImg = this.images.length; // Asignar el número de imágenes a la variable countImg
        console.log(this.countImg);
    })
    .catch(error => console.log(error));
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { PostService } from '../post.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  form: FormGroup;
  imagePreview: string;

  constructor( public datepipe: DatePipe, public postService: PostService ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'contenido': new FormControl(null, { validators: [Validators.required, Validators.minLength(2)] }),
      'image': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
  }

  onImagePicked(event: Event) {
    // capturo la imagen seleccionada
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    // almacena el valor internamente
    this.form.get('image').updateValueAndValidity();
  console.log(file);
//  console.log(this.form);
    // creo el lector de ficheros
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    console.log("LLAMO A LA FUNCION DE GUARDAR");
    // compruebo que el formulario es correcto
    if (this.form.invalid) {
      return;
    }
    let date = new Date;
    let now = this.datepipe.transform(date, 'dd-MM-yyyy');
    console.log("AHORA:  ", now);
    // creo un json con los datos recogidos del formulario
    let jsonData = { contenido: this.form.value.contenido, image: this.form.value.image, fechaCreacion: now, titulo: this.form.value.image.name };
    console.log("JSON DE LOS DATOS:   ", jsonData);

    // llamo a la función de añadir publicaciones del servicio
    this.postService.addPost(jsonData);

  }

}

import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/model/Moment';
import { Router } from '@angular/router';

import { MomentsService } from 'src/app/services/moments.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-new-moments',
  templateUrl: './new-moments.component.html',
  styleUrls: ['./new-moments.component.css']
})
export class NewMomentsComponent implements OnInit {

  btnText = 'Compartilhar!';

  // passando o service aonde tem o metodo post para o contrutor
  constructor(
     private momentService: MomentsService,
     private messageServices: MessagesService,
     public router: Router
    ) {   }

  ngOnInit(): void {

  }


  // função assincrona 
 async createHandler(moment: Moment){

  //forma date jascript para validação envio da img

  const formData = new FormData();

  formData.append('title', moment.title)
  formData.append("description", moment.desciption)

  // informando a condição se tiver imagem pois a imagen nao precisa ser obrigatoria
  if(moment.image){
    formData.append('image', moment.image)
  }

   // todo

   // subscribe para ocorrer
   // testar o metodo post no coisole network verificar se a resposta e 201
   await this.momentService.createMoment(formData).subscribe()

  this.messageServices.add('Momento adicionado com sucesso ! ');

   this.router.navigate(['/']);


 }

}

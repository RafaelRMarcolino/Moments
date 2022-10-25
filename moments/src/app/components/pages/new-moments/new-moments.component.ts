import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-moments',
  templateUrl: './new-moments.component.html',
  styleUrls: ['./new-moments.component.css']
})
export class NewMomentsComponent implements OnInit {

  btnText = 'Compartilhar!';

  constructor() { }

  ngOnInit(): void {
  }


 async createHandler(event: any){

    // para testar no console do html se a mensagem aparecer e por que o evento esta funcionando
    console.log('deu certo')
  }



}

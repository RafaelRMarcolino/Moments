import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// importado FormGroup angular forms
// importar formControl e Validotors para fazer a a validação
import { FormGroup, FormControl, Validators  } from '@angular/forms'
import { Moment } from 'src/app/model/Moment';

@Component({
  selector: 'app-moments-form',
  templateUrl: './moments-form.component.html',
  styleUrls: ['./moments-form.component.css']
})
export class MomentsFormComponent implements OnInit {

  // enviar o event emitter moments, importar EventEmitter e a imterface
  @Output() onSubmit = new EventEmitter<Moment>() 

  // deixar o valor default para deixar o valor de quem  for usar o compoenente
  @Input() btnText!: string;


  @Input() momentData: Moment | null = null;

  // excla,ação informando que o valor sera preenchido
  momentForm!: FormGroup

  constructor() { }

  ngOnInit(): void {

    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(''),

    })
  }

// para usar formularios reativos criar gets pegar o atributo do title do momentForm
  // para o valor conter no objeto
  get title(){
    return this.momentForm.get('title')!;
  }

  // colocar a exclamação infoirmado que o valor ira existir caso contratio tera como valor null
  get description(){
    return this.momentForm.get('description')!;
  }



  // metodo usado para incluir a imagem
  onFileSelected(event: any){

    const file: File = event.target.files[0];

    this.momentForm.patchValue({image: file})
  }

  submit(){
    // se estiver invalido ela da um retorno fazendo com que nao fique travado nas validações
    if(this.momentForm.invalid){
      return
    }
    // açterando o argumento do console para poder ver no console a imagem sendo inserida 
    console.log(this.momentForm.value);

    // enviando atrvaes do submit os dados do formulario no compoenente pai
    this.onSubmit.emit(this.momentForm.value)
  }


}

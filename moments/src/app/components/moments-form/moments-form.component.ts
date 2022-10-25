import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-moments-form',
  templateUrl: './moments-form.component.html',
  styleUrls: ['./moments-form.component.css']
})
export class MomentsFormComponent implements OnInit {

  // deixar o valor default para deixar o valor de quem  for usar o compoenente
  @Input() btnText!: string;

  constructor() { }

  ngOnInit(): void {
  }

}

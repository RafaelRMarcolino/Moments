import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Moment } from 'src/app/model/Moment';
import { MomentsService } from 'src/app/services/moments.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  moment! : Moment;
  btnText: string = 'Edit';

  constructor(
     private momentService: MomentsService,
     private route: ActivatedRoute,
     private messagesService: MessagesService,
     private router: Router,
     ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get("id"))

    this.momentService.getMomentsId(id).subscribe((item) => {
      this.moment = item.data
    })
  }

  async editHendler(momentData: Moment){

    const id = this.moment.id;

    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if(momentData.image){
      formData.append('image', momentData.image);
    }

    await this.momentService.updateMoment(id!, formData).subscribe()

      this.messagesService.add(`Moment ${id} foi atualizado com sucesso `)

      this.router.navigate(['/'])

  }

}

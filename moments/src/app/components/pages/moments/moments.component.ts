import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Moment } from 'src/app/model/Moment';
import { MomentsService } from 'src/app/services/moments.service';
import { environment } from 'src/environments/environment';
import { faTimesCircle, faTimesRectangle, faEdit } from '@fortawesome/free-regular-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';


@Component({
  selector: 'app-moments',
  templateUrl: './moments.component.html',
  styleUrls: ['./moments.component.css']
})
export class MomentsComponent implements OnInit {

  moment?: Moment;
  baseApiUrl = environment.baseApiUrl

  faTimesCircle = faTimesCircle;
  faTimesRectangle = faTimesRectangle;
  faEdit = faEdit;

  constructor(
    private momentService: MomentsService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMomentsId(id)
    .subscribe((item) => (this.moment = item.data ));
  }

  async removeHandler(id: number){

    await this.momentService.removeMoment(id).subscribe()

    this.messagesService.add('Momento excluido com sucesso! ');

    this.router.navigate(['/']); 


  }


}

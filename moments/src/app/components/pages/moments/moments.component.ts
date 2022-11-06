import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validator, FormGroupDirective, Validators } from '@angular/forms';

import { Moment } from 'src/app/model/Moment';
import { comment } from 'src/app/model/Comment';

import { MomentsService } from 'src/app/services/moments.service';
import { CommentService } from 'src/app/services/comment.service';

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

  commentForm!: FormGroup

  constructor(
    private momentService: MomentsService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService

  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMomentsId(id)
    .subscribe((item) => (this.moment = item.data ));

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])

    });
  }


  get text(){
    return this.commentForm.get('text')!;
  }

  get userName(){
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number){

    await this.momentService.removeMoment(id).subscribe()

    this.messagesService.add('Momento excluido com sucesso! ');

    this.router.navigate(['/']); 

  }

 async onSubmit(formDirective: FormGroupDirective){

    if(this.commentForm.invalid){
      return
    }

    const data: comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data)
    .subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messagesService.add('Comentario adicionado! ')

    this.commentForm.reset();

    formDirective.resetForm();

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Moment } from 'src/app/model/Moment';
import { MomentsService } from 'src/app/services/moments.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  moment! : Moment;
  btnText: string = 'Edit';

  constructor(private momentService: MomentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get("id"))

    this.momentService.getMomentsId(id).subscribe((item) => {
      this.moment = item.data
    })


  }

}

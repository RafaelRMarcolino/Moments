import { Component, OnInit } from '@angular/core';

import { MomentsService } from 'src/app/services/moments.service';

import { Moment } from 'src/app/model/Moment';

import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMoments: Moment[] = []
  moments: Moment[] = []
  baseApiUrl = environment.baseApiUrl


  constructor(private momentService: MomentsService ) { }

  ngOnInit(): void {

    this.momentService.getMoments().subscribe((item) => {
      const data = item.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.allMoments = data;
      this.moments = data;
    })

  }

}

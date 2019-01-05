import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user: User;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.data.user;
  }

}

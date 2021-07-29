import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {Subscription} from 'rxjs';
import {AuthService, UserData} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public auth: AuthService) {}

  async ngOnInit(): Promise<void> {
  }

  postMessage(form: NgForm): void {
  }

  logout(): void {
  }
}

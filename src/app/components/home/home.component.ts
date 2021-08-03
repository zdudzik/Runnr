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
  subs: Subscription[] = [];
  posts: any[] = [];
  user: UserData;

  constructor(private postService: PostService,
              public authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.subs.push(this.postService.getAllPosts().subscribe(async (posts) => {
      this.posts = posts;
      console.log(posts);
    }));

    this.subs.push(this.authService.CurrentUser().subscribe(user => {
      this.user = user;
      console.log(user);
    }));
  }

  postMessage(form: NgForm): void {
    const {message} = form.value;
    this.postService.postMessage(message,
      `${this.user.displayName}`,
      {
        dispalyName: this.user.displayName
      },
    );
    form.resetForm();
  }

  logout(): void {
    this.authService.signOut();
  }
}

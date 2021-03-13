import {Component} from '@angular/core'
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
selector: 'app-post-create',
templateUrl: './post-create.component.html',
styleUrls: ['./post-create.component.scss']
})

export class PostCreateComponent {

constructor(public postsService: PostsService){}

  onPostSave(form: NgForm){
    if(form.invalid){
      return;
    }
    this.postsService.addPost(form.value.title, form.value.text);
  }
}

import { invalid } from '@angular/compiler/src/render3/view/util';
import {Component, EventEmitter, Output } from '@angular/core'
import { NgForm } from '@angular/forms';
import {Post} from '../post.model'

@Component({
selector: 'app-post-create',
templateUrl: './post-create.component.html',
styleUrls: ['./post-create.component.scss']
})

export class PostCreateComponent {
  @Output() postCreated = new EventEmitter<Post>();

  onPostSave(form: NgForm){
    if(form.invalid){
      return;
    }
    const post: Post = {
      title: form.value.title,
      text: form.value.text,
      date: new Date(),
    };
    this.postCreated.emit(post);
  }
}

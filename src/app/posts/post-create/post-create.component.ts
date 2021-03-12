import {Component, EventEmitter, Output } from '@angular/core'
import {Post} from '../post.model'

@Component({
selector: 'app-post-create',
templateUrl: './post-create.component.html',
styleUrls: ['./post-create.component.scss']
})

export class PostCreateComponent {
  enteredTitle= '';
  enteredText = '';
  @Output() postCreated = new EventEmitter<Post>();

  onPostSave(){
    const post: Post = {
      title: this.enteredTitle,
      text: this.enteredText,
      date: new Date(),
    };
    this.postCreated.emit(post);
    this.enteredTitle='';
    this.enteredText = '';
  }
}

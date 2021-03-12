import {Component, EventEmitter, Output } from '@angular/core'

@Component({
selector: 'app-post-create',
templateUrl: './post-create.component.html',
styleUrls: ['./post-create.component.scss']
})

export class PostCreateComponent {
  enteredTitle= '';
  enteredText = '';
  @Output() postCreated = new EventEmitter();

  onPostSave(){
    const post = {
      title: this.enteredTitle,
      text: this.enteredText
    };
    this.postCreated.emit(post);
    this.enteredTitle='';
    this.enteredText = '';
  }
}

import {Component, EventEmitter, Output } from '@angular/core'

@Component({
selector: 'app-card-create',
templateUrl: './card-create.component.html',
styleUrls: ['./card-create.component.scss']
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

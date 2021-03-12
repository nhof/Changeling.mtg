import {Component, EventEmitter, Output } from '@angular/core'

@Component({
selector: 'app-card-create',
templateUrl: './card-create.component.html',
styleUrls: ['./card-create.component.scss']
})

export class CardCreateComponent {
  enteredName=""
  enteredRules = ''
  @Output() cardCreated = new EventEmitter();

  onCardSave(){
    const card = {
      cName: this.enteredName,
      cRules: this.enteredRules
    };
    this.cardCreated.emit(card);
    this.enteredName='';
    this.enteredRules = '';
  }
}

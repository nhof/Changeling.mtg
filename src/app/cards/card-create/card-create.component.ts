import {Component } from '@angular/core'

@Component({
selector: 'app-card-create',
templateUrl: './card-create.component.html'
})

export class CardCreateComponent {
  enteredRulestext = ''
  newRulestext = "NoContent"
  onCardSave(){
  this.newRulestext = this.enteredRulestext;
  }
}

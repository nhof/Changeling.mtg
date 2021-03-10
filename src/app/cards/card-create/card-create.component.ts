import {Component } from '@angular/core'

@Component({
selector: 'app-card-create',
templateUrl: './card-create.component.html',
styleUrls: ['./card-create.component.scss']
})

export class CardCreateComponent {
  enteredRulestext = ''
  newRulestext = "NoContent"
  onCardSave(){
  this.newRulestext = this.enteredRulestext;
  }
}

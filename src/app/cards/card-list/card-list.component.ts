import {Component} from '@angular/core'

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls:  ['./card-list.component.scss']
})

export class CardListComponent{
  //Just Smaple code
  cards = [{cardName:'1', rulesText:'2'}];
  // cards=[
  //   {cardName: 'Name1', rulesText:'This card goes whooo'},
  //   {cardName: 'Name2', rulesText:'This card goes yay'},
  //   {cardName: 'Name3', rulesText:'This card goes No'},
  // ];
}

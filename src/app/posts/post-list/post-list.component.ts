import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls:  ['./post-list.component.scss']
})

export class PostListComponent{
  @Input() posts=[];
  //Just Smaple code
  //cards = [{cardName:'1', rulesText:'2'}];
  // cards=[
  //   {cardName: 'Name1', rulesText:'This card goes whooo'},
  //   {cardName: 'Name2', rulesText:'This card goes yay'},
  //   {cardName: 'Name3', rulesText:'This card goes No'},
  // ];
}

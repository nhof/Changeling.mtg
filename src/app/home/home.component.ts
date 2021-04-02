import { Component, OnInit} from "@angular/core";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

  constructor(){}

  imgSrc = "http://localhost:3000/images/default/default"

  ngOnInit(){
    const rnd = Math.floor(Math.random()*4)
    console.log(rnd)
    switch(rnd){
      case 0:
        this.imgSrc +="_01.jpg";
      break;
    case 1:
      this.imgSrc +="_02.jpg";
      break;
    case 2:
      this.imgSrc +="_03.jpg";
      break;
    case 3:
      this.imgSrc +="_04.jpg";
      break;
    }
  };

}

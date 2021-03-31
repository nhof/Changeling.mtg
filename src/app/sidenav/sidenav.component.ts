import { Component } from "@angular/core";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent {


  Sidenav1 = {
    Name: "Home",
    Link: "/"
  };
  Sidenav2 = {
    Name: "Create Cards",
    Link: "/cards"
  };
  Sidenav3 = {
    Name: "Discussion",
    Link: "/postlist"
  };
  SidenavLinks = [this.Sidenav1,this.Sidenav2,this.Sidenav3];
  constructor(){}

}

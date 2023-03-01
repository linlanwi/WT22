import { Component, OnInit } from '@angular/core';
import { MyService } from '../shared/my.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  members: any ;

  constructor(private myService: MyService) { }

  ngOnInit(): void {
    this.members = this.myService.getMembers();
    console.log(this.members)
  }
}
// Array wird auf der Konsole ausgegeben
// hier sieht man die Einbindung des Services und die Verwendung der getMembers()-Fkt.

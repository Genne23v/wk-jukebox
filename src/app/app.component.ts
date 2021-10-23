import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web422-a4';
  primary:Boolean = true;
  manager = {employeeId: 137, fullName: "Rick Sanchez", primary: false}
  employees = [{employeeId: 128, fullName: "Morty Smith", onLeave: false},{employeeId: 129, fullName: "Summer Smith", onLeave: false},{employeeId: 130, fullName: "Jerry Smith", onLeave: true}]
  managerClicked(){
    console.log('clicked')
  }
}

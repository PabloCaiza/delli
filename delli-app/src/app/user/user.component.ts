import {Component} from '@angular/core';
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  username = 'pablo'
  isLoggedIn = false // esto ha funcionado como un estado

  greet() {
    alert('Hola')
  }

}

import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ContactComponent} from '../contact/contact.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RouterLink,
    ContactComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}

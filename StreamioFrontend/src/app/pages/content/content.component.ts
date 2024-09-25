import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

}

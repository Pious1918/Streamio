import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,MatSlideToggleModule, MatInputModule,MatSelectModule,MatDatepicker],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StreamioFrontend';
}

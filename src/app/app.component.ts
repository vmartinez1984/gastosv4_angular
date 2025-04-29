import { Component } from '@angular/core'
import { RouterModule, RouterOutlet } from '@angular/router'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { CdkMenuModule } from '@angular/cdk/menu'
import { MatToolbarModule } from '@angular/material/toolbar'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatMenuModule, CdkMenuModule, MatToolbarModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gastosv4_angular';
}

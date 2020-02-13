import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'instagram';

  constructor( private authService: AuthService ) {}

  ngOnInit() {
      // inicialización de la autentificación automática
      console.log("LLAMO AL AUTO AUTENTIFICACION!!!!");
      this.authService.autoAuthUser();
  }

}

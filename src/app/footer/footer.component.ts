import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  public userId: string;
  

  constructor( private authService: AuthService ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    
    this.userId = this.authService.getUserId();
    if(this.userId) {
      this.userId = localStorage.getItem("userId");
    }
    console.log("ID USUARIO:  ", this.userId);
    
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}

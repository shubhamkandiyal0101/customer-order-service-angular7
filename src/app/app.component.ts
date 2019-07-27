import { Component } from '@angular/core';
import { LocalstorageService } from './services/localstorage.service';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Customer Order Service';

  // completeUserInfo: any = JSON.parse(this._localstorageService.getItemCompleteInfo('userInfo'));

  constructor(private _localstorageService: LocalstorageService, private router: Router, private route: ActivatedRoute) { 
  	// if(this.completeUserInfo.isLogin == false || this.completeUserInfo.isLogin == '') {
   //    this._localstorageService.resetUserObject();
  	// }
  }

  /* function for logout user */
  logoutUser() {
     this._localstorageService.resetUserObject();
  }
  /* ends here ~ function for logout user */

}

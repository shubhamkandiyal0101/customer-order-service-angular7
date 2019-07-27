import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';
import { Router } from "@angular/router";
import { Http, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userEmail: string;
  userPass: string;
  completeUserInfo: any = this._localstorageService.completeUserInfo;

  constructor(private _localstorageService: LocalstorageService, private router: Router, private http: Http, private toastr:ToastrService) {
    if(this.completeUserInfo.isLogin == true) {
        this.router.navigate(['/'])
    }
  }

  ngOnInit() {
  }

  // function for login user
  loginUser(userType) {
  	this._localstorageService.fetchJsonFile('loginCredentials.json',((data)=>{
  		/*code after return data*/
  		let localUserData = data.filter(res =>{
  			return res.userType == userType
  		})
  		localUserData = localUserData[0].userRecord; /*overwrite variable*/
  		localUserData = localUserData.filter(res =>{
  			return res.email == this.userEmail && res.password == this.userPass;
  		}) /*filter and overwrite variable*/

  		if(localUserData.length > 0) {
  			let updateUserObj = this._localstorageService.updateUserObject(userType,true,localUserData[0].email)
  			window.localStorage.setItem("userInfo",JSON.stringify(updateUserObj))
  			this.router.navigate(['/'])
  		} else {
         this.toastr.error('Credentials not Match with any Records Or Might be You are choosing wrong User Type')
      }
  		/*ends here ~ code after return data*/
  	}))
  }
  // ends here ~ function for login user

}

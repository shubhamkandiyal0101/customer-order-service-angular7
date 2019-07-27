import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  fileLocation: string;
  jsonFileContent: any;
  completeUserInfo: any = JSON.parse(this.getItemCompleteInfo('userInfo'));


  constructor(private http:Http, private router:Router) {
    if(this.completeUserInfo.isLogin == false || this.completeUserInfo.isLogin == '') {
      this.resetUserObject();
    }
  	
  }

  resetUserObject() {
      window.localStorage.setItem('userInfo',JSON.stringify(this.updateUserObject('',false,'')));
      this.router.navigate(['/login'])
  }

  // function for update user object data to localstorage 
  updateUserObject(userTypePar, isLoginPar, userNamePar) {
  	return ({'userType':userTypePar,'isLogin':isLoginPar,'userName':userNamePar})
  }

  // function for fetch localstorage dynamic item value from localstorage
  getItemCompleteInfo(itemNamePar) {
  	let itemInfoData = window.localStorage.getItem(itemNamePar);
  	return itemInfoData;
  }

  // fetch json file and return json file data
  fetchJsonFile = (jsonFileName,callback) => {
    this.fileLocation = '../assets/json_files/'+jsonFileName;
    return this.http.get(this.fileLocation)
      .subscribe((data:any) => {
      this.jsonFileContent = JSON.parse(data._body);
      callback(this.jsonFileContent)
    })
  }
  // ends here ~ fetch json file and return json file data
}

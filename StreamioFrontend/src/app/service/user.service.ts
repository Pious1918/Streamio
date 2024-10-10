import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private userServiceUrl = 'http://localhost:5000/user-service'

  constructor(private http: HttpClient) { }


  registerUser(userData: any) {
    console.log("Hello from registeruser frontend")

    return this.http.post(`${this.userServiceUrl}/register`, userData)
  }


  checkEmail(email: string): Observable<any> {
    return this.http.get(`${this.userServiceUrl}/check-email?email=${email}`)
  }


  loginUser(userdata: any) {
    console.log(`entered @${userdata.email}`)
    return this.http.post(`${this.userServiceUrl}/login`, userdata)
  }


  getUserProfile():Observable<any>{
   
    return this.http.get(`${this.userServiceUrl}/userprofile`)
  }



  ///admin related 
  loginAdmin(admindata:any){
    console.log("entered admin data ",admindata.email)
    return this.http.post(`${this.userServiceUrl}/adminlogin`,admindata)
  }


  registerAdmin(admindata: any) {
    console.log("Hello from registeradmin frontend")

    return this.http.post(`${this.userServiceUrl}/adminregister`, admindata)
  }

  updatedData(newData:any){
    // const token = localStorage.getItem("authtoken")
    // console.log("toke",token)
    // const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    console.log("from servie",newData)
    return this.http.post(`${this.userServiceUrl}/update`,newData )
  }

  GetCustomerbycode(code:any){
    return this.http.get(`${this.userServiceUrl}/getbycode`,code);
  }


  subscribeChannel(channelId:any){
    return this.http.post(`${this.userServiceUrl}/subscribe`,{channelId});
  }

}

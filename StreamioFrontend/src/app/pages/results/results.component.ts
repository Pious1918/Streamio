import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  searchQuery: string = '';
  users: any[] = [];
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private http: HttpClient , private _userService:UserService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query']; // Extract the search query from the URL
      this.fetchResults();
    });
  }
private userServiceUrl = 'http://localhost:5000/user-service'
  fetchResults() {

   
    this.http
      .get<any[]>(`http://localhost:5000/user-service/users?name=${this.searchQuery}`)
      .subscribe(
        (response) => {
          this.users = response;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching users', error);
          this.loading = false;
        }
      );
  }


  subscribeCh(userid:any){
    console.log("id of subscribed channel" ,userid)
    this._userService.subscribeChannel(userid).subscribe(res=>{
        console.log(res)
    })
  }
}

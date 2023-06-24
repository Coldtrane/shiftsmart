import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-vacation-balance',
  templateUrl: './vacation-balance.component.html',
  styleUrls: ['./vacation-balance.component.css']
})
export class VacationBalanceComponent implements OnInit {
  calendarDays: number[] = [];
  daysTaken: number = 0;
  totalVacationDays: number = 0;
  remainingDays: number = 0;
  constructor(private http:HttpClient) { }
  VacationDates:any=[];

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(environment.API_URL+'vacationdates')
    .subscribe(data=>{
      this.VacationDates=data;
      this.remainingDays = data[0].date; 
      this.daysTaken = 20-this.remainingDays; 
      this.totalVacationDays = 20; 
    });
  }



}
import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

declare var Litepicker: any;
declare var bootstrap: any; 

@Component({
  selector: 'app-time-off-request',
  templateUrl: './time-off-request.component.html',
  styleUrls: ['./time-off-request.component.css']
})
export class TimeOffRequestComponent implements AfterViewInit {
  @ViewChild('calendarInput') calendarInputRef!: ElementRef;
  public reason: any;
  date: any;
  user_id = 1;
  submittedDate: any = ''; 

  constructor(private http: HttpClient, private el: ElementRef, private datePipe: DatePipe) { }

  ngAfterViewInit() {
    const picker = new Litepicker({
      element: document.getElementById('datepicker'),
      inlineMode: true,
      onSelect: (date: any) => {
        document.getElementById('dayField')!.textContent = date.format('MM/DD/YYYY');
      }
    });
  }

  clearDateField() {
    this.reason = '';
  }

  createClick() {
    var inputElement: HTMLInputElement = this.el.nativeElement.querySelector('#datepicker');
    var dateValue: string = inputElement.value;

    var vDates = {
      user_id: this.user_id,
      date: dateValue,
      reason: this.reason
    };

    this.submittedDate = this.datePipe.transform(dateValue, 'mediumDate');

    const providedDate = new Date(dateValue);
    const currentDate = new Date();

    if (providedDate <= currentDate) {
      alert('Please Select a future date.');
      return;
    }

    this.http.post(environment.API_URL + 'vacationdates', vDates)
      .subscribe(res => {
        alert(res.toString());
        this.clearDateField();

        if (res.toString() == 'Added Successfully') {
          this.showModal();
        }

      });
  }

  showModal() {
    var myModal = new bootstrap.Modal(document.getElementById('requestModal'), {});
    myModal.show();
  }
}

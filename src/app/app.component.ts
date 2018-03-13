import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  trackerType = [
    {value: 'Bug - Support', viewValue: 'Bug - Support'},
    {value: 'Defect - Test', viewValue: 'Defect - Test'},
    {value: 'Defect - Test Spec', viewValue: 'Defect - Test Spec'}
  ];

  priorityType = [
    {value: 'Urgent', viewValue: 'Urgent'},
    {value: 'Normal', viewValue: 'Normal'},
    {value: 'Low', viewValue: 'Low'}
  ];

  selectedTrackerType: String = "";
  trackerTypeResult: String = "";

  detailInput: String = "";
  detailResult: String = "";

  selectedPriorityType: String = "";
  priorityTypeResult: String = "";

  isShow: boolean = false;


  click() {

    if (!this.selectedTrackerType || !this.selectedPriorityType || !this.detailInput) {
      this.isShow = false;
      return;
    }

    this.trackerTypeResult = this.selectedPriorityType;
    this.detailResult = this.detailInput;
    this.priorityTypeResult = this.selectedPriorityType;
    this.isShow = true;
  }
}

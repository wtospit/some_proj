import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  trackerType = [
    {value: 'bugSupport', viewValue: 'Bug - Support'},
    {value: 'defectTest', viewValue: 'Defect - Test'},
    {value: 'defectTestSpec', viewValue: 'Defect - Test Spec'}
  ];

  priorityType = [
    {value: 'urgent', viewValue: 'Urgent'},
    {value: 'normal', viewValue: 'Normal'},
    {value: 'low', viewValue: 'Low'}
  ];


}

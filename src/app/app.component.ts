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

  selectedTrackerType: string = "";
  trackerTypeResult: string = "";

  detailInput: string = "";
  detailResult: string = "";

  selectedPriorityType: string = "";
  priorityTypeResult: string = "";

  isShow: boolean = false;
  isSuccess: boolean = true;

  lateMsg: string = "คากการณ์ว่าDefect นี้สามารถตรวจสอบ/แก้ไขได้ทันเวลา";
  inTimeMsg: string = "คาดการณ์ว่า Defect นี้ สามารถตรวจสอบ/แก้ไขล่าช้า"

  predictConditions = {

  }


  click() {
    this.isSuccess = true;
    this.isShow = false;
    if (!this.selectedTrackerType || !this.selectedPriorityType || !this.detailInput) {
      this.isShow = false;
      return;
    }

    this.trackerTypeResult = this.selectedTrackerType;
    this.detailResult = this.detailInput;
    this.priorityTypeResult = this.selectedPriorityType;
    this.isShow = true;
    this.miningBugSupport();

  }


  miningBugSupport() {
    let conditions = [{
      keyword: ["send", "failed"],
      priority: ["Urgent", "Normal", "Low"]
    },
    {
      keyword: ["ข้อมูล", "ไม่", "ถูก", "ส่ง"],
      priority: ["Urgent"]
    },
    {
      keyword: ["เพิ่ม", "ข้อมูล"],
      priority: ["Urgent"]
    },
    {
      keyword: ["แก้ไข", "ข้อมูล"],
      priority: ["Urgent"]
    },
    {
      keyword: ["แจ้ง", "ปัญหา", "ระบบ"],
      priority: ["Urgent", "Normal", "Low"]
    },
    {
      keyword: ["ตรวจสอบ", "error"],
      priority: ["Urgent"]
    }];
    for(let condition of conditions) {
      let isMatchKeyword = this.matchByKeywords(this.detailInput, condition.keyword);
      if(isMatchKeyword && (condition.priority.indexOf(this.selectedPriorityType) > -1)) {
        this.isSuccess = false;
        break;
      }
    }

    
  }

  matchByKeywords(str: string, keywords: string[]) {
    str = str.toLowerCase();
    const keywordLength = keywords;
    // return keywords.filter(function(word){
    //     return keywords.every((word) => {
    //       return str.match((word));
    //     });
    // });
    
      return keywords.every((word) => {
        console.log(str.match(word));
        return str.match((word)) ? true : false;
      });

}

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  trackerType = [
    { value: 'Bug - Support', viewValue: 'Bug - Support' },
    { value: 'Defect - Test', viewValue: 'Defect - Test' },
    { value: 'Defect - Test Spec', viewValue: 'Defect - Test Spec' }
  ];

  priorityType = [
    { value: 'Urgent', viewValue: 'Urgent' },
    { value: 'Normal', viewValue: 'Normal' },
    { value: 'Low', viewValue: 'Low' }
  ];

  selectedTrackerType: string = "";
  trackerTypeResult: string = "";

  detailInput: string = "";
  detailResult: string = "";

  selectedPriorityType: string = "";
  priorityTypeResult: string = "";

  isShow: boolean = false;
  isSuccess: boolean = true;

  inTimeMsg: string = "คากการณ์ว่าDefect นี้สามารถตรวจสอบ/แก้ไขได้ทันเวลา";
  lateMsg: string = "คาดการณ์ว่า Defect นี้ สามารถตรวจสอบ/แก้ไขล่าช้า"

  result: string = "";
  resultMsg: string = "";
  resultSolution: string = "";

  predictConditions = {

  }


  click() {
    this.result = "";
    this.resultMsg = "";
    this.resultSolution = "";
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
    switch (this.selectedTrackerType) {
      case "Bug - Support": {
        this.resultSolution = this.miningBugSupport();
        break;
      }
      case "Defect - Test": {
        this.resultSolution = this.miningDefectTest(); 
        break;
      }
      case "Defect - Test Spec": {
        this.resultSolution = this.miningDefectTestSpec(); 
        break;
      }
    }

    this.result = this.isSuccess ? "In time" : "Overtime"
    this.resultMsg = this.isSuccess ? this.inTimeMsg : this.lateMsg;
    

  }


  miningBugSupport() {
    let res = "";
    let conditions = [{
      keyword: ["send", "failed"],
      priority: ["Urgent", "Normal", "Low"],
      solution: "AAAAA",
    },
    {
      keyword: ["ข้อมูล", "ไม่", "ถูก", "ส่ง"],
      priority: ["Urgent"],
      solution: "BBBBB",
    },
    {
      keyword: ["เพิ่ม", "ข้อมูล"],
      priority: ["Urgent"],
      solution: "CCCCC",
    },
    {
      keyword: ["แก้ไข", "ข้อมูล"],
      priority: ["Urgent"],
      solution: "DDDDDD",
    },
    {
      keyword: ["แจ้ง", "ปัญหา", "ระบบ"],
      priority: ["Urgent", "Normal", "Low"],
      solution: "EEEEEE",
    },
    {
      keyword: ["ตรวจสอบ", "error"],
      priority: ["Urgent"],
      solution: "FFFFFF",
    }];
    for (let condition of conditions) {
      let isMatchKeyword = this.matchByKeywords(this.detailInput, condition.keyword);
      if (isMatchKeyword && (condition.priority.indexOf(this.selectedPriorityType) > -1)) {
        this.isSuccess = false;
        res = condition.solution;
        break;
      }
    }
    return res;
  }

  miningDefectTest() {
    let res = "";
    let conditions = [{
      keyword: ["format", "ไม่", "ถูกต้อง"],
      priority: ["Urgent"],
      solution: "GGG",
    },
    {
      keyword: ["ตรวจสอบ", "error"],
      priority: ["Urgent"],
      solution: "HHHH",
    },
    {
      keyword: ["ระบบ", "ทำงาน", "ไม่", "ถูกต้อง"],
      priority: ["Urgent"],
      solution: "IIIIII",
    }];
    for (let condition of conditions) {
      let isMatchKeyword = this.matchByKeywords(this.detailInput, condition.keyword);
      if (isMatchKeyword && (condition.priority.indexOf(this.selectedPriorityType) > -1)) {
        this.isSuccess = false;
        res = condition.solution;
        break;
      }
    }
    return res;
  }

  miningDefectTestSpec() {
    let res = "";
    let conditions = [{
      keyword: ["ตรวจสอบ", "request", "parameter"],
      priority: ["Urgent"],
      solution: "JJJJJ",
    },
    {
      keyword: ["รบกวน", "confirm"],
      priority: ["Urgent"],
      solution: "KKKKK",
    },
    {
      keyword: ["แก้ไข", "เอกสาร", "format"],
      priority: ["Urgent"],
      solution: "LLLLL",
    },
    
    ];
    for (let condition of conditions) {
      let isMatchKeyword = this.matchByKeywords(this.detailInput, condition.keyword);
      if (isMatchKeyword && (condition.priority.indexOf(this.selectedPriorityType) > -1)) {
        this.isSuccess = false;
        res = condition.solution;
        break;
      }
    }
    return res;
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

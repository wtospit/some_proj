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

  inTimeMsg: string = "คาดการณ์ว่าDefect นี้สามารถตรวจสอบ/แก้ไขได้ทันเวลา";
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
      solution: `เป็นข้อผิดพลาดที่เกิดขึ้นในช่วงเปิดการใช้งานระบบ คาดการณ์ได้ว่าข้อผิดพลาดที่เกิดขึ้นอาจส่งผลให้ตรวจสอบแก้ไขไม่ทันเวลาที่กำหนดไว้เมื่อเกิดข้อผิดพลาดนี้ นักทดสอบระบบควรแก้ปัญหาดังนี้
      <br>&nbsp; 1.	ตรวจสอบข้อมูลที่ต้องการส่งให้ครบถ้วนถูกต้อง
      <br>&nbsp; 2.	เขียนรายละเอียดข้อผิดพลาด(Defect detail)ให้ครอบคลุม เข้าใจง่ายเพื่อการแก้ปัญหาที่รวดเร็ว
      <br>&nbsp; 3.	ควรแจ้งให้ Developer รู้ก่อน เพื่อให้เตรียมการแก้ไขข้อผิดพลาดเหล่านั้นได้อย่างรวดเร็ว
      <br>&nbsp; 4.	ควรมีภาพประกอบในการแจ้งข้อผิดพลาด
      `,
    },
    {
      keyword: ["ข้อมูล", "ไม่", "ถูก", "ส่ง"],
      priority: ["Urgent"],
      solution: `เป็นข้อผิดพลาดที่เกิดขึ้นในช่วงเปิดการใช้งานระบบ คาดการณ์ได้ว่าข้อผิดพลาดที่เกิดขึ้นอาจส่งผลให้ตรวจสอบแก้ไขไม่ทันเวลาที่กำหนดไว้ กรณีนี้มักเกิดขึ้นเมื่อระดับความรุนแรงเป็นUrgentคือ Defect ที่ไม่สามารถทดสอบโปรแกรมในส่วนของ Function นั้นต่อได้เลย
      เมื่อเกิดข้อผิดพลาดนี้ นักทดสอบระบบควรแก้ปัญหาดังนี้
       <br>&nbsp; 1.	ตรวจสอบข้อมูลที่ต้องการส่งให้ครบถ้วนถูกต้อง
       <br>&nbsp; 2.	เขียนรายละเอียดข้อผิดพลาด(Defect detail)ให้ครอบคลุม เข้าใจง่ายเพื่อการแก้ปัญหาที่รวดเร็ว
       <br>&nbsp; 3.	ควรแจ้งให้ Developer รู้ก่อน เพื่อให้เตรียมการแก้ไขข้อผิดพลาดเหล่านั้นได้อย่างรวดเร็ว
       <br>&nbsp; 4.	ควรมีภาพประกอบในการแจ้งข้อผิดพลาด
       <br>&nbsp; 5.	ติดตามสถานะข้อผิดพลาดเป็นระยะๆ
      `,
    },
    {
      keyword: ["เพิ่ม", "ข้อมูล"],
      priority: ["Urgent"],
      solution: `เป็นข้อผิดพลาดที่เกิดขึ้นในช่วงเปิดการใช้งานระบบ คาดการณ์ได้ว่าข้อผิดพลาดที่เกิดขึ้นอาจส่งผลให้ตรวจสอบแก้ไขไม่ทันเวลาที่กำหนดไว้ กรณีนี้มักเกิดขึ้นเมื่อระดับความรุนแรงเป็นUrgentคือ Defect ที่ไม่สามารถทดสอบโปรแกรมในส่วนของ Function นั้นต่อได้เลย
      เมื่อเกิดข้อผิดพลาดนี้ นักทดสอบระบบควรแก้ปัญหาดังนี้
       <br>&nbsp; 1.	เตรียมข้อมูลที่ต้องการเพิ่มเติมให้พร้อมเนื่องจากถ้าไม่มีข้อมูลเหล่านี้ทำให้โปรแกรมไม่สามารถทำงานต่อได้
       <br>&nbsp; 2.	ตรวจสอบความถูกต้องของข้อมูล
       <br>&nbsp; 3.	เขียนรายละเอียดข้อผิดพลาด(Defect detail)ให้ครอบคลุม เข้าใจง่ายเพื่อการแก้ปัญหาที่รวดเร็ว
       <br>&nbsp; 4.	ควรแจ้งให้ Developer รู้ก่อน เพื่อให้เตรียมการแก้ไขข้อผิดพลาดเหล่านั้นได้อย่างรวดเร็ว
       <br>&nbsp; 5.	ควรมีภาพประกอบในการแจ้งข้อผิดพลาด
       <br>&nbsp; 6.	ติดตามสถานะข้อผิดพลาดเป็นระยะๆ
      `,
    },
    {
      keyword: ["แก้ไข", "ข้อมูล"],
      priority: ["Urgent"],
      solution: `เป็นข้อผิดพลาดที่เกิดขึ้นในช่วงเปิดการใช้งานระบบ คาดการณ์ได้ว่าข้อผิดพลาดที่เกิดขึ้นอาจส่งผลให้ตรวจสอบแก้ไขไม่ทันเวลาที่กำหนดไว้ กรณีนี้มักเกิดขึ้นเมื่อระดับความรุนแรงเป็นUrgentคือ Defect ที่ไม่สามารถทดสอบโปรแกรมในส่วนของ Function นั้นต่อได้เลย
      เมื่อเกิดข้อผิดพลาดนี้ นักทดสอบระบบควรแก้ปัญหาดังนี้
       <br>&nbsp; 1.	ข้อผิดพลาดที่เกี่ยวกับการแก้ไขข้อมูล มักเกี่ยวข้องกับ Database หรือ Log file
       <br>&nbsp; 2.	ตรวจสอบความถูกต้องของข้อมูลที่ต้องการแก้ไขเนื่องจากถ้าไม่มีข้อมูลเหล่านี้ทำให้โปรแกรมไม่สามารถทำงานต่อได้
       <br>&nbsp; 3.	เขียนรายละเอียดข้อผิดพลาด(Defect detail)ให้ครอบคลุม เข้าใจง่ายเพื่อการแก้ปัญหาที่รวดเร็ว
       <br>&nbsp; 4.	ควรแจ้งให้ Developer รู้ก่อน เพื่อให้เตรียมการแก้ไขข้อผิดพลาดเหล่านั้นได้อย่างรวดเร็ว
       <br>&nbsp; 5.	ควรมีภาพประกอบในการแจ้งข้อผิดพลาด
       <br>&nbsp; 6.	ติดตามสถานะข้อผิดพลาดเป็นระยะๆ
      `,
    },
    {
      keyword: ["แจ้ง", "ปัญหา", "ระบบ"],
      priority: ["Urgent", "Normal", "Low"],
      solution: `เป็นข้อผิดพลาดที่เกิดขึ้นในช่วงเปิดการใช้งานระบบ คาดการณ์ได้ว่าข้อผิดพลาดที่เกิดขึ้นอาจส่งผลให้ตรวจสอบแก้ไขไม่ทันเวลาที่กำหนดไว้ เมื่อเกิดข้อผิดพลาดนี้ นักทดสอบระบบควรแก้ปัญหาดังนี้
       <br>&nbsp; 1.	การแจ้งปัญหาระบบ มักเกี่ยวกับการ Environment ต่างๆในการทดสอบเช่น เครื่องtest, server, tool version ซึ่งปัญหาเหล่านี้ ต้องใช้ผู้เชี่ยวชาญเฉพาะด้วยช่วยแก้ปัญหา
       <br>&nbsp; 2.	ควรส่ง mail หรือ ติดต่อสื่อสารผ่านทางช่องทางต่างๆ ให้ผู้ที่เกี่ยวข้องทราบให้รวดเร็วที่สุด
       <br>&nbsp; 3.	เขียนรายละเอียดข้อผิดพลาด(Defect detail)ให้ครอบคลุม เข้าใจง่ายเพื่อการแก้ปัญหาที่รวดเร็ว
       <br>&nbsp; 4.	ควรแจ้งให้ Developer รู้ก่อน เพื่อให้เตรียมการแก้ไขข้อผิดพลาดเหล่านั้นได้อย่างรวดเร็ว
       <br>&nbsp; 5.	ควรมีภาพประกอบในการแจ้งข้อผิดพลาด
       <br>&nbsp; 6.	ติดตามสถานะข้อผิดพลาดเป็นระยะๆ
      `,
    },
    {
      keyword: ["ตรวจสอบ", "error"],
      priority: ["Urgent"],
      solution: `เป็นข้อผิดพลาดที่เกิดขึ้นในช่วงเปิดการใช้งานระบบ คาดการณ์ได้ว่าข้อผิดพลาดที่เกิดขึ้นอาจส่งผลให้ตรวจสอบแก้ไขไม่ทันเวลาที่กำหนดไว้ กรณีนี้มักเกิดขึ้นเมื่อระดับความรุนแรงเป็นUrgentหรือ Normalคือ Defect ที่ไม่สามารถทดสอบโปรแกรมในส่วนของ Function นั้นต่อได้เลยหรือ ระบบจะแสดงผลถูกต้องเมื่อใส่ข้อมูลถูกต้อง แต่เมื่อใส่ข้อมูลไม่ถูกต้อง ระบบจะแสดงผลผิดพลาด
      เมื่อเกิดข้อผิดพลาดนี้ นักทดสอบระบบควรแก้ปัญหาดังนี้
       <br>&nbsp; 1.	ตรวจสอบ errorที่เกิดขึ้นว่าเกิดจากFunctionใด
       <br>&nbsp; 2.	ควรเขียนขั้นตอนที่ทำให้เกิด error นี้ให้ชัดเจน
       <br>&nbsp; 3.	เขียนรายละเอียดข้อผิดพลาด(Defect detail)ให้ครอบคลุม เข้าใจง่ายเพื่อการแก้ปัญหาที่รวดเร็ว
       <br>&nbsp; 4.	ควรแจ้งให้ Developer รู้ก่อน เพื่อให้เตรียมการแก้ไขข้อผิดพลาดเหล่านั้นได้อย่างรวดเร็ว
       <br>&nbsp; 5.	ควรมีภาพประกอบในการแจ้งข้อผิดพลาด
       <br>&nbsp; 6.	ติดตามสถานะข้อผิดพลาดเป็นระยะๆ
      `,
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
      solution: `เป็นข้อผิดพลาดที่เกิดขึ้นในช่วงการทดสอบคาดการณ์ได้ว่าข้อผิดพลาดที่เกิดขึ้นอาจส่งผลให้ตรวจสอบแก้ไขไม่ทันเวลาที่กำหนดไว้ กรณีนี้มักเกิดขึ้นเมื่อระดับความรุนแรงเป็นUrgentคือ Defect ที่ไม่สามารถทดสอบโปรแกรมในส่วนของ Function นั้นต่อได้เลยเมื่อเกิดข้อผิดพลาดนี้ นักทดสอบระบบควรแก้ปัญหาดังนี้
       <br>&nbsp; 1.	ตรวจสอบ formatต่างๆ ที่ถูกต้อง เช่น format Log หรือ format message ซึ่งแต่ละระบบมี format ที่ต่างกันควรตรวจสอบทั้งภาษาไทยและภาษาอังกฤษ
       <br>&nbsp; 2.	เขียนรายละเอียดข้อผิดพลาด(Defect detail)ให้ครอบคลุม เข้าใจง่ายเพื่อการแก้ปัญหาที่รวดเร็ว
       <br>&nbsp; 3.	ควรแจ้งให้ Developer รู้ก่อน เพื่อให้เตรียมการแก้ไขข้อผิดพลาดเหล่านั้นได้อย่างรวดเร็ว
       <br>&nbsp; 4.	ควรมีภาพประกอบในการแจ้งข้อผิดพลาด
       <br>&nbsp; 5.	ติดตามสถานะข้อผิดพลาดเป็นระยะๆ
      `,
    },
    {
      keyword: ["ตรวจสอบ", "error"],
      priority: ["Urgent"],
      solution: `เป็นข้อผิดพลาดที่เกิดขึ้นในช่วงเปิดการใช้งานระบบ คาดการณ์ได้ว่าข้อผิดพลาดที่เกิดขึ้นอาจส่งผลให้ตรวจสอบแก้ไขไม่ทันเวลาที่กำหนดไว้ กรณีนี้มักเกิดขึ้นเมื่อระดับความรุนแรงเป็นUrgentคือ Defect ที่ไม่สามารถทดสอบโปรแกรมในส่วนของ Function นั้นต่อได้เลยเมื่อเกิดข้อผิดพลาดนี้ นักทดสอบระบบควรแก้ปัญหาดังนี้
       <br>&nbsp; 1.	ตรวจสอบ error ที่เกิดขึ้นว่าเกิดจากFunctionใด
       <br>&nbsp; 2.	ควรเขียนขั้นตอนที่ทำให้เกิด error นี้ให้ชัดเจน
       <br>&nbsp; 3.	เขียนรายละเอียดข้อผิดพลาด(Defect detail)ให้ครอบคลุม เข้าใจง่ายเพื่อการแก้ปัญหาที่รวดเร็ว
       <br>&nbsp; 4.	ควรแจ้งให้ Developer รู้ก่อน เพื่อให้เตรียมการแก้ไขข้อผิดพลาดเหล่านั้นได้อย่างรวดเร็ว
       <br>&nbsp; 5.	ควรมีภาพประกอบในการแจ้งข้อผิดพลาด
       <br>&nbsp; 6.	ติดตามสถานะข้อผิดพลาดเป็นระยะๆ
      `,
    },
    {
      keyword: ["ระบบ", "ทำงาน", "ไม่", "ถูกต้อง"],
      priority: ["Urgent"],
      solution: `เป็นข้อผิดพลาดที่เกิดขึ้นในช่วงเปิดการใช้งานระบบ คาดการณ์ได้ว่าข้อผิดพลาดที่เกิดขึ้นอาจส่งผลให้ตรวจสอบแก้ไขไม่ทันเวลาที่กำหนดไว้ กรณีนี้มักเกิดขึ้นเมื่อระดับความรุนแรงเป็นUrgentคือ Defect ที่ไม่สามารถทดสอบโปรแกรมในส่วนของ Function นั้นต่อได้เลยเมื่อเกิดข้อผิดพลาดนี้ นักทดสอบระบบควรแก้ปัญหาดังนี้
       <br>&nbsp; 1.	ตรวจสอบ error ที่เกิดขึ้นว่าเกิดจากFunctionใด
       <br>&nbsp; 2.	ควรเขียนขั้นตอนเปรียบเทียบการทำงานที่ถูกต้องและไม่ถูกต้องให้ชัดเจน
       <br>&nbsp; 3.	เขียนรายละเอียดข้อผิดพลาด(Defect detail)ให้ครอบคลุม เข้าใจง่ายเพื่อการแก้ปัญหาที่รวดเร็ว
       <br>&nbsp; 4.	ควรแจ้งให้ Developer รู้ก่อน เพื่อให้เตรียมการแก้ไขข้อผิดพลาดเหล่านั้นได้อย่างรวดเร็ว
       <br>&nbsp; 5.	ควรมีภาพประกอบในการแจ้งข้อผิดพลาด
       <br>&nbsp; 6.	ติดตามสถานะข้อผิดพลาดเป็นระยะๆ
      `,
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
      solution: `เป็นข้อผิดพลาดที่เกิดขึ้นในช่วงเปิดการใช้งานระบบ คาดการณ์ได้ว่าข้อผิดพลาดที่เกิดขึ้นอาจส่งผลให้ตรวจสอบแก้ไขไม่ทันเวลาที่กำหนดไว้ กรณีนี้มักเกิดขึ้นเมื่อระดับความรุนแรงเป็นUrgentคือ Defect ที่ไม่สามารถทดสอบโปรแกรมในส่วนของ Function นั้นต่อได้เลยเมื่อเกิดข้อผิดพลาดนี้ นักทดสอบระบบควรแก้ปัญหาดังนี้
       <br>&nbsp; 1.	ตรวจสอบ Requestparameter ที่ต้องการใช้งานในเอกสาร ว่ามี parameterอะไรบ้าง
       <br>&nbsp; 2.	ตรวจสอบ Requestparameter ที่ระบบสามารถรองรับได้ และ validate ไว้ให้
       <br>&nbsp; 3.	ควรพิจารณาตัวอักษรเล็กใหญ่ว่าตรงกันหรือไม่
       <br>&nbsp; 4.	เขียนรายละเอียดข้อผิดพลาด(Defect detail)ให้ครอบคลุม เข้าใจง่ายเพื่อการแก้ปัญหาที่รวดเร็ว
       <br>&nbsp; 5.	ควรแจ้งให้ Developer รู้ก่อน เพื่อให้เตรียมการแก้ไขข้อผิดพลาดเหล่านั้นได้อย่างรวดเร็ว
       <br>&nbsp; 6.	ควรมีภาพประกอบในการแจ้งข้อผิดพลาด
       <br>&nbsp; 7.	ติดตามสถานะข้อผิดพลาดเป็นระยะๆ
      `,
    },
    {
      keyword: ["รบกวน", "confirm"],
      priority: ["Urgent"],
      solution: `เป็นข้อผิดพลาดที่เกิดขึ้นในช่วงเปิดการใช้งานระบบ คาดการณ์ได้ว่าข้อผิดพลาดที่เกิดขึ้นอาจส่งผลให้ตรวจสอบแก้ไขไม่ทันเวลาที่กำหนดไว้ กรณีนี้มักเกิดขึ้นเมื่อระดับความรุนแรงเป็นUrgentคือ Defect ที่ไม่สามารถทดสอบโปรแกรมในส่วนของ Function นั้นต่อได้เลยเมื่อเกิดข้อผิดพลาดนี้ นักทดสอบระบบควรแก้ปัญหาดังนี้
       <br>&nbsp; 1.	ปัญหานี้ ต้องใช้ผู้เชี่ยวชาญเฉพาะด้วยช่วยแก้ปัญหาเช่นนักออกแบบระบบ เป็นปัญหาที่ต้องการให้ช่วยยืนยันว่าระบบหรือ Application สามารถทำงานได้ถูกต้องตามความต้องการจริงๆซึ่งใช้ระยะเวลาในการประสานงานค่อนข้างมาก
       <br>&nbsp; 2.	ควรส่ง mail หรือ ติดต่อสื่อสารผ่านทางช่องทางต่างๆให้ผู้ที่เกี่ยวข้องทราบให้รวดเร็วที่สุด
       <br>&nbsp; 3.	ควรแจ้งให้ให้ครอบคลุมเข้าใจง่ายเพื่อการแก้ปัญหาที่รวดเร็ว
       <br>&nbsp; 4.	ติดตามสถานะตลอดเวลา
      `,
    },
    {
      keyword: ["แก้ไข", "เอกสาร", "format"],
      priority: ["Urgent"],
      solution: `เป็นข้อผิดพลาดที่เกิดขึ้นในช่วงการทดสอบคาดการณ์ได้ว่าข้อผิดพลาดที่เกิดขึ้นอาจส่งผลให้ตรวจสอบแก้ไขไม่ทันเวลาที่กำหนดไว้ กรณีนี้มักเกิดขึ้นเมื่อระดับความรุนแรงเป็นUrgentคือ Defect ที่ไม่สามารถทดสอบโปรแกรมในส่วนของ Function นั้นต่อได้เลยเมื่อเกิดข้อผิดพลาดนี้ นักทดสอบระบบควรแก้ปัญหาดังนี้
       <br>&nbsp; 1.	ตรวจสอบ formatต่างๆ ที่ถูกต้อง เช่น format เขียนเอกสาร หรือ format message ซึ่งแต่ละระบบมี format ที่ต่างกันควรตรวจสอบทั้งภาษาไทยและภาษาอังกฤษ
       <br>&nbsp; 2.	เขียนรายละเอียดข้อผิดพลาด(Defect detail)ให้ครอบคลุม เข้าใจง่ายเพื่อการแก้ปัญหาที่รวดเร็ว
       <br>&nbsp; 3.	ควรแจ้งให้ Developer รู้ก่อน เพื่อให้เตรียมการแก้ไขข้อผิดพลาดเหล่านั้นได้อย่างรวดเร็ว
       <br>&nbsp; 4.	ควรมีภาพประกอบในการแจ้งข้อผิดพลาด
       <br>&nbsp; 5.	ติดตามสถานะข้อผิดพลาดเป็นระยะๆ
      `,
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

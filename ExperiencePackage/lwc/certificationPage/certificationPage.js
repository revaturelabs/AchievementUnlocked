import { LightningElement, track, wire, api } from "lwc";
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import REVATURELOGO from "@salesforce/resourceUrl/RevatureLogo";
import ADMLOGO from "@salesforce/resourceUrl/AdmLogo";
import ADVANCEDADMLOGO from "@salesforce/resourceUrl/AdvancedAdmLogo";
import JAVASCRIPTLOGO from "@salesforce/resourceUrl/JavscriptDevLogo";
import PD1 from "@salesforce/resourceUrl/Pd1Logo";
import PD2 from "@salesforce/resourceUrl/Pd2Logo";
import PAB from "@salesforce/resourceUrl/platformappbuilder";
import getVoucherAdm from "@salesforce/apex/ExperienceController.getVoucherAdm";
import getPracticesAdm from "@salesforce/apex/ExperienceController.getPracticesAdm";
import getCertStatusAdm from "@salesforce/apex/ExperienceController.getCertStatusAdm";
import getPracticesAdvancedAdm from "@salesforce/apex/ExperienceController.getPracticesAdvancedAdm";
import getVoucherAdvancedAdm from "@salesforce/apex/ExperienceController.getVoucherAdvancedAdm";
import getCertStatusAdvancedAdm from "@salesforce/apex/ExperienceController.getCertStatusAdvancedAdm";
import getVoucherJavascr from "@salesforce/apex/ExperienceController.getVoucherJavascr";
import getPracticesJavascr from "@salesforce/apex/ExperienceController.getPracticesJavascr";
import getCertStatusJavascr from "@salesforce/apex/ExperienceController.getCertStatusJavascr";
import getCertStatusPd1 from "@salesforce/apex/ExperienceController.getCertStatusPd1";
import getPracticesPd1 from "@salesforce/apex/ExperienceController.getPracticesPd1";
import getVoucherPd1 from "@salesforce/apex/ExperienceController.getVoucherPd1";
import getVoucherPd2 from "@salesforce/apex/ExperienceController.getVoucherPd2";
import getCertStatusPd2 from "@salesforce/apex/ExperienceController.getCertStatusPd2";
import getPracticesPd2 from "@salesforce/apex/ExperienceController.getPracticesPd2";
import getPracticesPab from "@salesforce/apex/ExperienceController.getPracticesPab";
import getCertStatusPab from "@salesforce/apex/ExperienceController.getCertStatusPab";
import getVoucherPab from "@salesforce/apex/ExperienceController.getVoucherPab";
import STATUS_FIELD from "@salesforce/schema/Voucher__c.Status__c";
import ATTEMPT_OBJECT from "@salesforce/schema/Attempt__c";

const voucherColumns = [
  { label: "Voucher Type", fieldName: "Voucher_Type__c", type: "picklist" },
  { label: "Voucher Code", fieldName: "Voucher_Code__c", type: "text" },
];
const sColumns = [
  { label: " Type", fieldName: "_Type__c", type: "picklist" },
  { label: "Passed?", fieldName: "Passed__c", type: "checkbox" },
  { label: "Practice Score", fieldName: "Practice_Score__c", type: "percent" },
];
const certColumns = [
  {
    label: "Certification Status",
    fieldName: "Certified__c",
<<<<<<< HEAD:ExperiencePackage/lwc/certificationPage/certificationPage.js
    type: "picklist",
=======
    type: "checkbox",
>>>>>>> b875f2f59921b1b47c6968a586fdbfd4742a0eae:ExperiencePackage/force-app/main/default/lwc/certification_Page/certification_Page.js
  },
  { label: " Due Date", fieldName: "Due_Date__c", type: "Date" },
];

export default class Certification_Page extends LightningElement {
  // things to track button clicks and bool values
<<<<<<< HEAD:ExperiencePackage/lwc/certificationPage/certificationPage.js
   clickedButtonAdm = "Show Adm";
=======
  clickedButtonAdm = "Show Adm";
>>>>>>> b875f2f59921b1b47c6968a586fdbfd4742a0eae:ExperiencePackage/force-app/main/default/lwc/certification_Page/certification_Page.js
  clickedButtonAdvancedAdm = "Show Advanced Adm";
  clickedButtonJavascr = "Show JavaScript";
  clickedButtonPd1 = "Show Pd1";
  clickedButtonPd2 = "Show Pd2";
  clickedButtonPab = "Show Pab";
<<<<<<< HEAD:ExperiencePackage/lwc/certificationPage/certificationPage.js
  clickedButtonPabCert
=======
  clickedButtonPabCert;
>>>>>>> b875f2f59921b1b47c6968a586fdbfd4742a0eae:ExperiencePackage/force-app/main/default/lwc/certification_Page/certification_Page.js
  clickedButtonPabPra = "Practice";
  boolVisibleAdm = false;
  boolVisibleAdvancedAdm = false;
  boolVisibleJavascr = false;
  boolVisiblePd1 = false;
  boolVisiblePd2 = false;
  boolVisiblePab = false;
  boolVisiblePabCert = true;
  boolVisiblePabPra = true;
  modalPabCert = false;
<<<<<<< HEAD:ExperiencePackage/lwc/certificationPage/certificationPage.js
=======
  modalPabPra = false;

  // Attempts Modal for Inputting an Attempt
  inputAttemptsModal;
  currentVoucherType;
  currentPracticeVoucherId;
  currentCertVoucherId;
  @track
  currentRecordTypeId;
>>>>>>> b875f2f59921b1b47c6968a586fdbfd4742a0eae:ExperiencePackage/force-app/main/default/lwc/certification_Page/certification_Page.js

  @wire(getObjectInfo, {objectApiName : ATTEMPT_OBJECT})
  attemptInfo;

  // static resources
  revatureLogo = REVATURELOGO;
  admLogo = ADMLOGO;
  advancedAdmLogo = ADVANCEDADMLOGO;
  javascriptLogo = JAVASCRIPTLOGO;
  Pd1Logo = PD1;
  Pd2Logo = PD2;
  pablogo = PAB;

  // logic for data tables
  // tie content to columns
  voucherColumns = voucherColumns;
  sColumns = sColumns;
  certColumns = certColumns;
  // tie content to adm
  @wire(getPracticesAdm)
  sAdm;
  @wire(getVoucherAdm)
  voucherAdm;
  @wire(getCertStatusAdm)
  certAdm;
  // tie content to advanced adm
  @wire(getPracticesAdvancedAdm)
  sAdvAdm;
  @wire(getVoucherAdvancedAdm)
  voucherAdvAdm;
  @wire(getCertStatusAdvancedAdm)
  certAdvAdm;
  // tie content to javascript
  @wire(getPracticesJavascr)
  sJavascr;
  @wire(getVoucherJavascr)
  voucherJavascr;
  @wire(getCertStatusJavascr)
  certJavascr;
  // tie content to Pd1
  @wire(getPracticesPd1)
  sPd1;
  @wire(getVoucherPd1)
  voucherPd1;
  @wire(getCertStatusPd1)
  certPd1;
  // tie content to Pd2
  @wire(getPracticesPd2)
  sPd2;
  @wire(getVoucherPd2)
  voucherPd2;
  @wire(getCertStatusPd2)
  certPd2;
  // tie content to Pab
  @wire(getPracticesPab)
  sPab;
  @wire(getVoucherPab)
  voucherPab;
  @wire(getCertStatusPab)
  certPab;

  // field and specific ids for modal
  statusField = STATUS_FIELD;
  @api objectApiName;
  //pab cert and practice vouchers ids

  //button clicks for badges
  // click event for adm
  handleClickAdm(event) {
    const label = event.target.label;
    if (label === "Show Adm") {
      this.clickedButtonAdm = "Hide Adm";
      this.boolVisibleAdm = true;
      this.clickedButtonAdvancedAdm = "Show Advanced Adm";
      this.boolVisibleAdvancedAdm = false;
      this.clickedButtonJavascr = "Show JavaScript";
      this.boolVisibleJavascr = false;
      this.clickedButtonPd1 = "Show Pd1";
      this.boolVisiblePd1 = false;
      this.clickedButtonPd2 = "Show Pd2";
      this.boolVisiblePd2 = false;
      this.clickedButtonPab = "Show Pab";
      this.boolVisiblePab = false;
      this.currentVoucherType = "Adm";
      for (let i of this.voucherAdm.data) {
        if (i.Voucher_Type__c == "Certification") {
            this.currentCertVoucherId = i.Id;
        } else if(i.Voucher_Type__c == "Practice") {
          this.currentPracticeVoucherId = i.Id;
        }
      }
      this.getRecordTypeId("Administrator");
    } else if (label === "Hide Adm") {
      this.clickedButtonAdm = "Show Adm";
      this.boolVisibleAdm = false;
    }
  }
  // click event for advanced adm
  handleClickAdvancedAdm(event) {
    const label = event.target.label;
    if (label === "Show Advanced Adm") {
      this.clickedButtonAdvancedAdm = "Hide Advanced Adm";
      this.boolVisibleAdvancedAdm = true;
      this.clickedButtonAdm = "Show Adm";
      this.boolVisibleAdm = false;
      this.clickedButtonJavascr = "Show JavaScript";
      this.boolVisibleJavascr = false;
      this.clickedButtonPd1 = "Show Pd1";
      this.boolVisiblePd1 = false;
      this.clickedButtonPd2 = "Show Pd2";
      this.boolVisiblePd2 = false;
      this.clickedButtonPab = "Show Pab";
      this.boolVisiblePab = false;
      this.currentVoucherType = "Advanced Adm";
      for (let i of this.voucherAdvAdm.data) {
        if (i.Voucher_Type__c == "Certification") {
            this.currentCertVoucherId = i.Id;
        }  else if(i.Voucher_Type__c == "Practice") {
          this.currentPracticeVoucherId = i.Id;
        }
      }
      this.getRecordTypeId("Advanced Administrator");
    } else if (label === "Hide Advanced Adm") {
      this.clickedButtonAdvancedAdm = "Show Advanced Adm";
      this.boolVisibleAdvancedAdm = false;
    }
  }
  // click event for javascript
  handleClickJavascr(event) {
    const label = event.target.label;
    if (label === "Show JavaScript") {
      this.clickedButtonJavascr = "Hide JavaScript";
      this.boolVisibleJavascr = true;
      this.clickedButtonAdm = "Show Adm";
      this.boolVisibleAdm = false;
      this.clickedButtonAdvancedAdm = "Show Advanced Adm";
      this.boolVisibleAdvancedAdm = false;
      this.clickedButtonPd1 = "Show Pd1";
      this.boolVisiblePd1 = false;
      this.clickedButtonPd2 = "Show Pd2";
      this.boolVisiblePd2 = false;
      this.clickedButtonPab = "Show Pab";
      this.boolVisiblePab = false;
      this.currentVoucherType = "Javascript";
      for (let i of this.voucherJavascr.data) {
        if (i.Voucher_Type__c == "Certification") {
            this.currentCertVoucherId = i.Id;
        }  else if(i.Voucher_Type__c == "Practice") {
          this.currentPracticeVoucherId = i.Id;
        }
      }
      this.getRecordTypeId("JavaScript Developer I");
    } else if (label === "Hide JavaScript") {
      this.clickedButtonJavascr = "Show JavaScript";
      this.boolVisibleJavascr = false;
    }
  }
  // click event for Pd1
  handleClickPd1(event) {
    const label = event.target.label;
    if (label === "Show Pd1") {
      this.clickedButtonPd1 = "Hide Pd1";
      this.boolVisiblePd1 = true;
      this.clickedButtonAdm = "Show Adm";
      this.boolVisibleAdm = false;
      this.clickedButtonAdvancedAdm = "Show Advanced Adm";
      this.boolVisibleAdvancedAdm = false;
      this.clickedButtonJavascr = "Show JavaScript";
      this.boolVisibleJavascr = false;
      this.clickedButtonPd2 = "Show Pd2";
      this.boolVisiblePd2 = false;
      this.clickedButtonPab = "Show Pab";
      this.boolVisiblePab = false;
      this.currentVoucherType = "PD1";
      for (let i of this.voucherPd1.data) {
        if (i.Voucher_Type__c == "Certification") {
            this.currentCertVoucherId = i.Id;
        }  else if(i.Voucher_Type__c == "Practice") {
          this.currentPracticeVoucherId = i.Id;
        }
      }
      this.getRecordTypeId("Platform Developer I");
    } else if (label === "Hide Pd1") {
      this.clickedButtonPd1 = "Show Pd1";
      this.boolVisiblePd1 = false;
    }
  }
  // click event for Pd2
  handleClickPd2(event) {
    const label = event.target.label;
    if (label === "Show Pd2") {
      this.clickedButtonPd2 = "Hide Pd2";
      this.boolVisiblePd2 = true;
      this.clickedButtonAdm = "Show Adm";
      this.boolVisibleAdm = false;
      this.clickedButtonAdvancedAdm = "Show Advanced Adm";
      this.boolVisibleAdvancedAdm = false;
      this.clickedButtonJavascr = "Show JavaScript";
      this.boolVisibleJavascr = false;
      this.clickedButtonPd1 = "Show Pd1";
      this.boolVisiblePd1 = false;
      this.clickedButtonPab = "Show Pab";
      this.boolVisiblePab = false;
      this.currentVoucherType = "PD2";
      for (let i of this.voucherPd2.data) {
        if (i.Voucher_Type__c == "Certification") {
            this.currentCertVoucherId = i.Id;
        } else if(i.Voucher_Type__c == "Practice") {
          this.currentPracticeVoucherId = i.Id;
        }
      }
      this.getRecordTypeId("Platform Developer II");
    } else if (label === "Hide Pd2") {
      this.clickedButtonPd2 = "Show Pd2";
      this.boolVisiblePd2 = false;
    }
  }
  // click event for Pab
  handleClickPab(event) {
    const label = event.target.label;
    if (label === "Show Pab") {
      this.clickedButtonPab = "Hide Pab";
      this.boolVisiblePab = true;
      this.clickedButtonPd2 = "Show Pd2";
      this.boolVisiblePd2 = false;
      this.clickedButtonAdm = "Show Adm";
      this.boolVisibleAdm = false;
      this.clickedButtonAdvancedAdm = "Show Advanced Adm";
      this.boolVisibleAdvancedAdm = false;
      this.clickedButtonJavascr = "Show JavaScript";
      this.boolVisibleJavascr = false;
      this.clickedButtonPd1 = "Show Pd1";
      this.boolVisiblePd1 = false;
      this.currentVoucherType = "Platform App Builder";
      for (let i of this.voucherPab.data) {
        if (i.Voucher_Type__c == "Certification") {
            this.currentCertVoucherId = i.Id;
        }  else if(i.Voucher_Type__c == "Practice")  {
          this.currentPracticeVoucherId = i.Id;
        }
      }
      this.getRecordTypeId("Platform App Builder");
    } else if (label === "Hide Pab") {
      this.clickedButtonPab = "Show Pab";
      this.boolVisiblePab = false;
    }
  }
  // click event for Pab practice
  handleClickPabCert(event) {
    this.modalPabCert = true;
  }

  handleClickPabPra(event) {
      this.modalPabPra = true;
  }

  // close modals
  closeModal() {
    this.modalPabCert = false;
    this.modalPabPra = false;
  }
  closeModalPabCert() {
    this.modalPabCert = false;
    this.boolVisiblePabCert = false;
  }
  closeModalPabPra() {
    this.modalPabPra = false;
    this.boolVisiblePabPra = false;
  }

  showAttemptsInputModal() {
    console.log("hi got in here");
    this.inputAttemptsModal = true;
  }

  closeAttemptInputModal() {
    this.inputAttemptsModal = false;
  }

  openWebAssessor() {
    window.open(
      'https://www.webassessor.com/salesforce',
      '_blank' // <- This is what makes it open in a new window.
    );
  }


  getRecordTypeId(recordTypeName) {
    console.log("hi got in here",this.attemptInfo);
    let recordTypeInfo = this.attemptInfo.data.recordTypeInfos;
    for(let recordType in recordTypeInfo) {
      if(recordTypeInfo[recordType].name == recordTypeName) {
        this.currentRecordTypeId = recordTypeInfo[recordType].recordTypeId;
      }
    }
  }


}
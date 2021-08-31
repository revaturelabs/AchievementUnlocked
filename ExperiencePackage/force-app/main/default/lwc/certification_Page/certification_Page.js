import { LightningElement, track, wire, api } from "lwc";
import REVATURELOGO from "@salesforce/resourceUrl/RevatureLogo";
import ADMLOGO from "@salesforce/resourceUrl/AdmLogo";
import ADVANCEDADMLOGO from "@salesforce/resourceUrl/AdvancedAdmLogo";
import JAVASCRIPTLOGO from "@salesforce/resourceUrl/JavscriptDevLogo";
import PD1 from "@salesforce/resourceUrl/Pd1Logo";
import PD2 from "@salesforce/resourceUrl/Pd2Logo";
import PAB from "@salesforce/resourceUrl/platformappbuilder";
import getVoucherAdm from "@salesforce/apex/ExperienceController.getVoucherAdm";
import getPracticeAttemptsAdm from "@salesforce/apex/ExperienceController.getPracticeAttemptsAdm";
import getCertStatusAdm from "@salesforce/apex/ExperienceController.getCertStatusAdm";
import getPracticeAttemptsAdvancedAdm from "@salesforce/apex/ExperienceController.getPracticeAttemptsAdvancedAdm";
import getVoucherAdvancedAdm from "@salesforce/apex/ExperienceController.getVoucherAdvancedAdm";
import getCertStatusAdvancedAdm from "@salesforce/apex/ExperienceController.getCertStatusAdvancedAdm";
import getVoucherJavascr from "@salesforce/apex/ExperienceController.getVoucherJavascr";
import getPracticeAttemptsJavascr from "@salesforce/apex/ExperienceController.getPracticeAttemptsJavascr";
import getCertStatusJavascr from "@salesforce/apex/ExperienceController.getCertStatusJavascr";
import getCertStatusPd1 from "@salesforce/apex/ExperienceController.getCertStatusPd1";
import getPracticeAttemptsPd1 from "@salesforce/apex/ExperienceController.getPracticeAttemptsPd1";
import getVoucherPd1 from "@salesforce/apex/ExperienceController.getVoucherPd1";
import getVoucherPd2 from "@salesforce/apex/ExperienceController.getVoucherPd2";
import getCertStatusPd2 from "@salesforce/apex/ExperienceController.getCertStatusPd2";
import getPracticeAttemptsPd2 from "@salesforce/apex/ExperienceController.getPracticeAttemptsPd2";
import getPracticeAttemptsPab from "@salesforce/apex/ExperienceController.getPracticeAttemptsPab";
import getCertStatusPab from "@salesforce/apex/ExperienceController.getCertStatusPab";
import getVoucherPab from "@salesforce/apex/ExperienceController.getVoucherPab";
import STATUS_FIELD from "@salesforce/schema/Voucher__c.Status__c";

const voucherColumns = [
  { label: "Voucher Type", fieldName: "Voucher_Type__c", type: "picklist" },
  { label: "Voucher Code", fieldName: "Voucher_Code__c", type: "text" },
];
const attemptsColumns = [
  { label: "Attempt Type", fieldName: "Attempt_Type__c", type: "picklist" },
  { label: "Passed?", fieldName: "Passed__c", type: "checkbox" },
  { label: "Practice Score", fieldName: "Practice_Score__c", type: "percent" },
];
const certColumns = [
  {
    label: "Certification Status",
    fieldName: "Certification_Status__c",
    type: "picklist",
  },
  { label: "Attempt Due Date", fieldName: "Due_Date__c", type: "Date" },
];


export default class Certification_Page extends LightningElement {
  // things to track button clicks and bool values
  @track clickedButtonAdm = "Show Adm";
  @track clickedButtonAdvancedAdm = "Show Advanced Adm";
  @track clickedButtonJavascr = "Show JavaScript";
  @track clickedButtonPd1 = "Show Pd1";
  @track clickedButtonPd2 = "Show Pd2";
  @track clickedButtonPab = "Show Pab";
  @track clickedButtonPabCert
  @track clickedButtonPabPra = "Practice";
  @track boolVisibleAdm = false;
  @track boolVisibleAdvancedAdm = false;
  @track boolVisibleJavascr = false;
  @track boolVisiblePd1 = false;
  @track boolVisiblePd2 = false;
  @track boolVisiblePab = false;
  @track boolVisiblePabCert = true;
  @track boolVisiblePabPra = true;
  @track modalPabCert = false;


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
  attemptsColumns = attemptsColumns;
  certColumns = certColumns;
  // tie content to adm
  @wire(getPracticeAttemptsAdm)
  attemptsAdm;
  @wire(getVoucherAdm)
  voucherAdm;
  @wire(getCertStatusAdm)
  certAdm;
  // tie content to advanced adm
  @wire(getPracticeAttemptsAdvancedAdm)
  attemptsAdvAdm;
  @wire(getVoucherAdvancedAdm)
  voucherAdvAdm;
  @wire(getCertStatusAdvancedAdm)
  certAdvAdm;
  // tie content to javascript
  @wire(getPracticeAttemptsJavascr)
  attemptsJavascr;
  @wire(getVoucherJavascr)
  voucherJavascr;
  @wire(getCertStatusJavascr)
  certJavascr;
  // tie content to Pd1
  @wire(getPracticeAttemptsPd1)
  attemptsPd1;
  @wire(getVoucherPd1)
  voucherPd1;
  @wire(getCertStatusPd1)
  certPd1;
  // tie content to Pd2
  @wire(getPracticeAttemptsPd2)
  attemptsPd2;
  @wire(getVoucherPd2)
  voucherPd2;
  @wire(getCertStatusPd2)
  certPd2;
  // tie content to Pab
  @wire(getPracticeAttemptsPab)
  attemptsPab;
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
    } else if (label === "Hide Pab") {
      this.clickedButtonPab = "Show Pab";
      this.boolVisiblePab = false;
    }
  }
  // click event for Pab cert
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
    } else if (label === "Hide Pab") {
      this.clickedButtonPab = "Show Pab";
      this.boolVisiblePab = false;
    }
  }
  // click event for Pab practice
  handleClickPabCertMdl(event) {
    this.modalPabCert = true;
    }

    // close modals
    closeModal() {
      this.modalPabCert = false;
    }
}

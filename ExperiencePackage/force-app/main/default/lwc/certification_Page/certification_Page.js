import { LightningElement, track, wire } from "lwc";
import REVATURELOGO from "@salesforce/resourceUrl/RevatureLogo";
import ADMLOGO from "@salesforce/resourceUrl/AdmLogo";
import ADVANCEDADMLOGO from "@salesforce/resourceUrl/AdvancedAdmLogo";
import JAVASCRIPTLOGO from "@salesforce/resourceUrl/JavscriptDevLogo";
import PD1 from "@salesforce/resourceUrl/Pd1Logo";
import PD2 from "@salesforce/resourceUrl/Pd1Logo";
import getVoucherADM from "@salesforce/apex/ExperienceController.getVoucherADM";

const voucherColumns = [
  { label: "Voucher Type", fieldName: "Voucher_Type__c", type: "picklist" },
  { label: "Voucher Code", fieldName: "Voucher_Code__c", type: "text" },
];

export default class Certification_Page extends LightningElement {
  // things to track button clicks and bool values
  @track clickedButtonAdm = "Show Adm";
  @track clickedButtonDeveloper = "Show Developer";
  @track boolVisibleAdm = false;
  @track boolVisibleDeveloper = false;

  // static resources
  revatureLogo = REVATURELOGO;
  admLogo = ADMLOGO;
  advancedAdmLogo = ADVANCEDADMLOGO;
  javascriptLogo = JAVASCRIPTLOGO;
  Pd1Logo = PD1;
  Pd2Logo = PD2;

  // tie content to adm
  voucherColumns = voucherColumns;
  @wire(getVoucherADM)
  voucher;

  // click event for adm
  handleClickAdm(event) {
    const label = event.target.label;

    if (label === "Show Adm") {
      this.clickedButtonAdm = "Hide Adm";
      this.boolVisibleAdm = true;
    } else if (label === "Hide Adm") {
      this.clickedButtonAdm = "Show Adm";
      this.boolVisibleAdm = false;
    }
  }

  // click event for Developer
  handleClickDeveloper(event) {
    const label = event.target.label;

    if (label === "Show Developer") {
      this.clickedButtonDeveloper = "Hide Developer";
      this.boolVisibleDeveloper = true;
    } else if (label === "Hide Developer") {
      this.clickedButtonDeveloper = "Show Developer";
      this.boolVisibleDeveloper = false;
    }
  }
}

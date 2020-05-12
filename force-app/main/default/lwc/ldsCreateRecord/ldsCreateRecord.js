import { LightningElement } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { reduceErrors } from "c/ldsUtils";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

export default class LdsCreateRecord extends LightningElement {
  handleButtonClick() {
    const recordInput = {
      apiName: ACCOUNT_OBJECT.objectApiName,
      fields: {
        [NAME_FIELD.fieldApiName]: "Alhambra",
        [REVENUE_FIELD.fieldApiName]: 3000000,
        [INDUSTRY_FIELD.fieldApiName]: "Food & Beverage"
      }
    };

    createRecord(recordInput)
      .then(data => {
        const toastEvent = new ShowToastEvent({
          title: "Account created",
          message: "Record ID: " + data.id,
          variant: "success"
        });
        this.dispatchEvent(toastEvent);
      })
      .catch(error => {
        const toastEvent = new ShowToastEvent({
          title: "Error creating account",
          message: "Record ID: " + reduceErrors(error).concat(","),
          variant: "error"
        });
        this.dispatchEvent(toastEvent);
      });
  }
}

import { LightningElement, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { reduceErrors } from "c/ldsUtils";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import createAccount from "@salesforce/apex/AccountController.createAccount";
import getAccounts from "@salesforce/apex/AccountController.getAccounts";
import { refreshApex } from "@salesforce/apex";

const COLUMNS = [
  { label: "Account Name", fieldName: NAME_FIELD.fieldApiName, type: "text" },
  {
    label: "Annual Revenue",
    fieldName: REVENUE_FIELD.fieldApiName,
    type: "currency"
  },
  { label: "Industry", fieldName: INDUSTRY_FIELD.fieldApiName, type: "text" }
];

export default class ApexImperative extends LightningElement {
  columns = COLUMNS;

  @wire(getAccounts)
  accounts;

  get errors() {
    return this.accounts.error ? reduceErrors(this.accounts.error) : [];
  }

  handleButtonClick() {
    createAccount()
      .then((data) => {
        const toastEvent = new ShowToastEvent({
          title: "Account created",
          message: "Record ID: " + data.Id,
          variant: "success"
        });
        this.dispatchEvent(toastEvent);
        refreshApex(this.accounts);
      })
      .catch((error) => {
        const toastEvent = new ShowToastEvent({
          title: "Error creating account",
          message: "Error: " + reduceErrors(error).join(","),
          variant: "error"
        });
        this.dispatchEvent(toastEvent);
      });
  }
}

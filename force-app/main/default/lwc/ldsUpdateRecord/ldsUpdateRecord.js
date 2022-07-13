import { LightningElement, wire } from "lwc";
import {
  getRecord,
  generateRecordInputForUpdate,
  updateRecord,
  getFieldValue
} from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { reduceErrors } from "c/ldsUtils";
import REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";

export default class LdsUpdateRecord extends LightningElement {
  recordId = "0012D00000SdQ2tQAF";
  newAnnualRevenue;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [REVENUE_FIELD]
  })
  record;

  handleInputChange(event) {
    this.newAnnualRevenue = event.detail.value;
  }

  handleButtonClick() {
    if (this.record) {
      const recordInput = generateRecordInputForUpdate(this.record.data);
      recordInput.fields[REVENUE_FIELD.fieldApiName] = this.newAnnualRevenue;

      updateRecord(recordInput)
        .then((data) => {
          const toastEvent = new ShowToastEvent({
            title: "Account updated",
            message:
              "New annual revenue: " + getFieldValue(data, REVENUE_FIELD),
            variant: "success"
          });
          this.dispatchEvent(toastEvent);
        })
        .catch((error) => {
          const toastEvent = new ShowToastEvent({
            title: "Error updating account",
            message: "Error: " + reduceErrors(error).join(","),
            variant: "error"
          });
          this.dispatchEvent(toastEvent);
        });
    }
  }
}

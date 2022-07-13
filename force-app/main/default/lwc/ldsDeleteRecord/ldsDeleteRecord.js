import { LightningElement } from "lwc";
import { deleteRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { reduceErrors } from "c/ldsUtils";

export default class LdsDeleteRecord extends LightningElement {
  recordId = "0011700001Ut0BOAAZ";

  handleButtonClick() {
    deleteRecord(this.recordId)
      .then((data) => {
        const toastEvent = new ShowToastEvent({
          title: "Account deleted",
          message: "Record ID: " + data.id,
          variant: "success"
        });
        this.dispatchEvent(toastEvent);
      })
      .catch((error) => {
        const toastEvent = new ShowToastEvent({
          title: "Error deleting account",
          message: "Error: " + reduceErrors(error).join(","),
          variant: "error"
        });
        this.dispatchEvent(toastEvent);
      });
  }
}

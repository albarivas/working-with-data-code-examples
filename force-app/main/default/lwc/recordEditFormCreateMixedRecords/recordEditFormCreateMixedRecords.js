import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import CONTACT_OBJECT from "@salesforce/schema/Contact";
import CONTACT_FIRSTNAME_FIELD from "@salesforce/schema/Contact.FirstName";
import CONTACT_LASTNAME_FIELD from "@salesforce/schema/Contact.LastName";
import OPPORTUNITY_OBJECT from "@salesforce/schema/Opportunity";
import OPPORTUNITY_NAME_FIELD from "@salesforce/schema/Opportunity.Name";
import OPPORTUNITY_STAGENAME_FIELD from "@salesforce/schema/Opportunity.StageName";
import OPPORTUNITY_CLOSEDATE_FIELD from "@salesforce/schema/Opportunity.CloseDate";
import { createRecord } from "lightning/uiRecordApi";

export default class RecordEditCreate extends LightningElement {
  objectApiName = CONTACT_OBJECT;
  contactFirstNameField = CONTACT_FIRSTNAME_FIELD;
  contactLastNameField = CONTACT_LASTNAME_FIELD;
  opportunityName;

  handleOpportunityNameInputChange(event) {
    this.opportunityName = event.target.value;
  }

  handleContactCreationSuccess() {
    this.createOpportunity();
  }

  createOpportunity() {
    // Note: In this example we generate the record input structure from scratch for simplicity.
    // Consider to use the generateRecordInputForCreate() function instead.
    // The function will create the record input for you, including only fields that are createable.
    // Check https://developer.salesforce.com/docs/component-library/documentation/en/50.0/lwc/reference_generate_record_input_update
    const recordInput = {
      apiName: OPPORTUNITY_OBJECT.objectApiName,
      fields: {
        [OPPORTUNITY_NAME_FIELD.fieldApiName]: this.opportunityName,
        [OPPORTUNITY_STAGENAME_FIELD.fieldApiName]: "Prospecting",
        [OPPORTUNITY_CLOSEDATE_FIELD.fieldApiName]: new Date(2025, 1, 1)
      }
    };

    createRecord(recordInput)
      .then((result) => this.handleSuccess(result.id, "Opportunity"))
      .catch((error) => this.handleErrors(error));
  }

  handleSuccess() {
    const evt = new ShowToastEvent({
      title: "Success",
      message: "Contact & Oppty created",
      variant: "success"
    });
    this.dispatchEvent(evt);
  }

  handleErrors(error) {
    const evt = new ShowToastEvent({
      title: "Error",
      message: `Error creating records: ${reduceErrors(error).join(", ")}`,
      variant: "error"
    });
    this.dispatchEvent(evt);
  }
}

import { LightningElement, wire } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

export default class LdsGetRecordFunction extends LightningElement {
  recordId = "0010U000011boGMQAY";
  data;
  error;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD]
  })
  wiredRecord({ data, error }) {
    console.log("Execute logic each time a new value is provisioned");
    if (data) {
      this.data = data;
      this.error = undefined;
    }
    if (error) {
      this.data = undefined;
      this.error = error;
    }
  }

  get nameFieldValue() {
    return this.data ? getFieldValue(this.data, NAME_FIELD) : "";
  }

  get revenueFieldValue() {
    return this.data ? getFieldValue(this.data, REVENUE_FIELD) : "";
  }

  get industryFieldValue() {
    return this.data ? getFieldValue(this.data, INDUSTRY_FIELD) : "";
  }
}

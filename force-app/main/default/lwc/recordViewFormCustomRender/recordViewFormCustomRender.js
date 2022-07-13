import { LightningElement, wire } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

export default class RecordViewFormCustomRender extends LightningElement {
  objectApiName = ACCOUNT_OBJECT;
  recordId = "0011700001Ut0BOAAZ";

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD]
  })
  record;

  get nameFieldValue() {
    return this.record.data ? getFieldValue(this.record.data, NAME_FIELD) : "";
  }

  get revenueFieldValue() {
    return this.record.data
      ? getFieldValue(this.record.data, REVENUE_FIELD)
      : "";
  }

  get industryFieldValue() {
    return this.record.data
      ? getFieldValue(this.record.data, INDUSTRY_FIELD)
      : "";
  }
}

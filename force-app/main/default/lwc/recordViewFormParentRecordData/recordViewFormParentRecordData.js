import { LightningElement, wire } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import OWNER_NAME_FIELD from "@salesforce/schema/Account.Owner.Name";

export default class RecordViewFormParentRecordData extends LightningElement {
  objectApiName = ACCOUNT_OBJECT;
  nameField = NAME_FIELD;
  revenueField = REVENUE_FIELD;
  industryField = INDUSTRY_FIELD;
  recordId = "0010U000011boGMQAY";

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [OWNER_NAME_FIELD]
  })
  record;

  get ownerNameFieldValue() {
    return this.record.data
      ? getFieldValue(this.record.data, OWNER_NAME_FIELD)
      : "";
  }
}

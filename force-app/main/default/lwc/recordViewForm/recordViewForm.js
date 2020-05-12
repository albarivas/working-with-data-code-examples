import { LightningElement } from "lwc";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

export default class RecordViewForm extends LightningElement {
  objectApiName = ACCOUNT_OBJECT;
  nameField = NAME_FIELD;
  revenueField = REVENUE_FIELD;
  industryField = INDUSTRY_FIELD;
}

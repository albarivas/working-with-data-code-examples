import { LightningElement } from "lwc";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

export default class RecordFormReadLayout extends LightningElement {
  objectApiName = ACCOUNT_OBJECT;
}

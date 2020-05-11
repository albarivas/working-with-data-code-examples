import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class RecordFormUpdate extends LightningElement {
  objectApiName = ACCOUNT_OBJECT;

  fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];

  handleSuccess(event) {
    const toastEvent = new ShowToastEvent({
      title: 'Account updated',
      message: 'Record ID: ' + event.detail.id,
      variant: 'success'
    });
    this.dispatchEvent(toastEvent);
  }
}

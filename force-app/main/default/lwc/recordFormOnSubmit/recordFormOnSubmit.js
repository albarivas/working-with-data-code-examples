import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class RecordFormOnSubmit extends LightningElement {
  objectApiName = ACCOUNT_OBJECT;

  fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];

  handleSubmit(event) {
    event.preventDefault();
    const fields = event.detail.fields;
    fields.Description = 'Description set automatically on submit.';
    this.template.querySelector('lightning-record-form').submit(fields);
  }

  handleSuccess(event) {
    const toastEvent = new ShowToastEvent({
      title: 'Account created',
      message: 'Record ID: ' + event.detail.id,
      variant: 'success'
    });
    this.dispatchEvent(toastEvent);
  }
}

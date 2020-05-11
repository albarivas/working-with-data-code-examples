import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class RecordEditCreateCustomError extends LightningElement {
  objectApiName = ACCOUNT_OBJECT;
  nameField = NAME_FIELD;
  revenueField = REVENUE_FIELD;
  industryField = INDUSTRY_FIELD;

  handleSuccess(event) {
    const toastEvent = new ShowToastEvent({
      title: 'Account created',
      message: 'Record ID: ' + event.detail.id,
      variant: 'success'
    });
    this.dispatchEvent(toastEvent);
  }

  handleError(event){
    this.dispatchEvent(
        new ShowToastEvent({
            title: 'Error creating record',
            message: `${event.detail.message} ${event.detail.detail}`,
            variant: 'error',
        }),
    );
}
}

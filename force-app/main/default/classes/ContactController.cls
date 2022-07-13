public with sharing class ContactController {
  @AuraEnabled
  public static void createContactAndOpportunity(
    String contactFirstName,
    String contactLastName,
    String opportunityName
  ) {
    Contact newContact = new Contact(
      FirstName = contactFirstName,
      LastName = contactLastName
    );
    insert newContact;

    Opportunity newOpportunity = new Opportunity(
      Name = opportunityName,
      StageName = 'Prospecting',
      CloseDate = System.today()
    );
    insert newOpportunity;
  }
}

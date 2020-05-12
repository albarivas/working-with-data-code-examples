public with sharing class AccountController {
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccounts() {
    return [
      SELECT Name, AnnualRevenue, Industry
      FROM Account
      WITH SECURITY_ENFORCED
      ORDER BY Name
    ];
  }

  @AuraEnabled
  public static Account createAccount() {
    Account acct = new Account();
    acct.Name = 'Cruzcampo';
    acct.AnnualRevenue = 1000000;
    acct.Industry = 'Food & Beverage';

    insert acct;

    return acct;
  }
}

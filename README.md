# Code Examples that show how to work with Salesforce Data in LWC

1. If you haven't already done so, authorize with your hub org and provide it with an alias (**myhuborg** in the command below):

   ```
   sfdx force:auth:web:login -d -a myhuborg
   ```

1. Create a scratch org and provide it with an alias (**working-with-data-code-examples** in the command below):

   ```
   sfdx force:org:create -s -f config/project-scratch-def.json -a working-with-data-code-examples
   ```

1. Push the app to your scratch org:

   ```
   sfdx force:source:push
   ```

1. Assign the **Working_with_Data** permission set to the default user:

   ```
   sfdx force:user:permset:assign -n Working_with_Data
   ```

1. Open the scratch org:

   ```
   sfdx force:org:open
   ```

1. Find an Account in your org and do a search & replace on the code, as the account Id is hardcoded to "0010U000011boGMQAY". Then push again. 

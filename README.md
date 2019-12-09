# node-bamazon
Node application to replicate amazon shopping using mysql.

How to use:
1) If you do not have node js installed on computer please follow https://nodejs.org/en/ and install node.
2) If you do not have mysql installed on your machine please follow https://www.mysql.com to install mysql and qorkbench.
3) Open workbench and run local mysql instance.
4) Copy contents of CreateDatabase.sql in query tab and run the sql.
5) Copy contents of InsertSampleData.sql in query tab and run the sql.
6) Open bamazonDbController.js and replace ########### with your mysql password. Leave blank if you dont have password.
6) If you are a customer, clone this repository and navigate to node-bamazon folder in terminal.
7) Run command npm install

Now you have completed the pre-requisits for using this product.

For customers: 
1) Run command: node bamazonCustomer.js
This will print : connected as id 97.
and ask you: '? Would what would you like to buy?'

2) Use arrow keys to navigate to desired item and press enter.
This will ask you: '? How many Items would you like to buy?'

3) Enter quantity and press Enter button.
If item is in stock we will mark item as sold. And print 'Transaction success'
If item is not available we will display message 'Insufficient quantity!'

4) We will ask you if you would like to continue: '? Would you like to continue shopping?'

5) Select appropriate answer with arrow keys and press enter.

6) Saying 'Yes' would take you back to shopping.

7) Saying 'No' would kill application.

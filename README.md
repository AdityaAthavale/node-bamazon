# node-bamazon
Node application to replicate amazon shopping using mysql.

How to use:
1) If you do not have node js installed on computer please follow https://nodejs.org/en/ and install node.
1) If you are a customer, clone this repository and navigate to node-bamazon folder in terminal.
2) Run command npm install

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

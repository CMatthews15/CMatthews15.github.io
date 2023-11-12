
class Budget {
    constructor() {
        // Initial array of transactions, reading from localStorage
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    }

    // Event listener for form submission
    addFormEventListener() {
        document.getElementById('expForm').addEventListener('submit', (e) => this.addTransaction(e));
    }

    // Function to add a new transaction
    addTransaction(e) {
        e.preventDefault();

        // Get type, name, and amount from the form
        let type = document.getElementById('type').value;
        let description = document.getElementById('description').value;
        let amount = document.getElementById('amount').value;

        if (type !== 'chooseOne' && description.length > 0 && amount > 0) {
            const transaction = {
                type,
                description,
                amount,
                id: this.transactions.length > 0 ? this.transactions[this.transactions.length - 1].id + 1 : 1,
            };

            this.transactions.push(transaction);
            localStorage.setItem('transactions', JSON.stringify(this.transactions));
        }

        document.getElementById('expForm').reset();
        this.showTransactions();
        this.updateBalance();
    }

    // Function to display transactions in the HTML table
    showTransactions() {
        const transactionTable = document.getElementById('transactionTable');
        transactionTable.innerHTML = '';

        for (let i = 0; i < this.transactions.length; i++) {
            transactionTable.innerHTML += `
                <tr>
                    <td>${this.transactions[i].type}</td>
                    <td>${this.transactions[i].description}</td>
                    <td>$${this.transactions[i].amount}</td>
                    <td><a class="deleteButton" onclick="budget.deleteTransaction(${this.transactions[i].id})">
                        Delete</td>
                </tr>
            `;
        }
    }

    // Function to delete a transaction
    deleteTransaction(id) {
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].id == id) {
                this.transactions.splice(i, 1);
            }
        }

        localStorage.setItem('transactions', JSON.stringify(this.transactions));
        this.showTransactions();
        this.updateBalance();
    }

    // Function to update the balance based on income and expenses
    updateBalance() {
        let balance = 0;

        this.transactions.forEach((transaction) => {
            if (transaction.type === "income") {
                balance += Number(transaction.amount);
            } else if (transaction.type === "expense") {
                balance -= transaction.amount;
            }
        });

        document.querySelector(".balance").textContent = balance;
    }
}

// Instantiate the Budget class
const budget = new Budget();

// Add event listener for form submission
budget.addFormEventListener();


/*
// Event listener for form submission
document.getElementById('expForm').addEventListener('submit', addTransaction);

// Initial array of transactions, reading from localStorage
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Function to add a new transaction
function addTransaction(e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get type, name, and amount from the form
    let type = document.getElementById('type').value;
    let description = document.getElementById('description').value;
    let amount = document.getElementById('amount').value;

    // Check if the input values are valid
    if (type != 'chooseOne' && description.length > 0 && amount > 0) {
        // Create a new transaction object
        const transaction = {
            type,
            description,
            amount,
            // Generate a unique ID for the transaction
            id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
        }

        // Add the new transaction to the transactions array
        transactions.push(transaction);

        // Update localStorage with the updated transactions array
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    // Reset the form after adding a transaction
    document.getElementById('expForm').reset();

    // Update the displayed transactions and balance
    showTransactions();
    updateBalance();
}

// Function to display transactions in the HTML table
const showTransactions = () => {
    // Get the HTML table element
    const transactionTable = document.getElementById('transactionTable');

    // Clear the existing content of the table
    transactionTable.innerHTML = '';

    // Populate the table with rows for each transaction
    for (let i = 0; i < transactions.length; i++) {
        transactionTable.innerHTML += `
            <tr>
                <td>${transactions[i].type}</td>
                <td>${transactions[i].description}</td>
                <td>$${transactions[i].amount}</td>
                <td><a class="deleteButton" onclick="deleteTransaction(${transactions[i].id})">
                    Delete</td>
            </tr>
        `;
    }
}

// Function to delete a transaction
const deleteTransaction = (id) => {
    // Iterate through the transactions array to find the transaction with the specified ID
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id == id) {
            // Remove the transaction from the array
            transactions.splice(i, 1);
        }
    }

    // Update localStorage with the updated transactions array
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Update the displayed transactions and balance
    showTransactions();
    updateBalance();
}

// Function to update the balance based on income and expenses
const updateBalance = () => {
    // Initialize the balance
    let balance = 0;

    // Iterate through the transactions array
    transactions.forEach((transaction) => {
        // Update the balance based on the type of transaction (income or expense)
        if (transaction.type === "income") {
            balance += Number(transaction.amount);
        } else if (transaction.type === "expense") {
            balance -= transaction.amount;
        }
    });

    // Display the updated balance in the HTML element with the class "balance"
    document.querySelector(".balance").textContent = balance;
}*/


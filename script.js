
let income = 0;
let expense = 0;

// Load records from LocalStorage
let transactions = JSON.parse(
    localStorage.getItem("transactions")
) || [];

// Add Transaction
function addTransaction() {

    let description = document.getElementById("description").value;

    let amount = Number(document.getElementById("amount").value);

    let type = document.getElementById("type").value;

    if (description.trim() == "" || amount <= 0) {
        alert("Please enter valid details");
        return;
    }

    let transaction = {
        description: description,
        amount: amount,
        type: type
    };

    // Add record to array
    transactions.push(transaction);

    // Save records
    saveData();

    // Update display
    displayData();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

}

// Save data in LocalStorage
function saveData() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

// Display Transactions
function displayData() {

    income = 0;
    expense = 0;

    let list = document.getElementById("list");

    list.innerHTML = "";

    for (let i = 0; i < transactions.length; i++) {

        if (transactions[i].type == "income") {
            income = income + transactions[i].amount;
        }
        else {
            expense = expense + transactions[i].amount;
        }

        let li = document.createElement("li");

        li.innerHTML =
            transactions[i].description +
            " - ₹" + transactions[i].amount;

        let button = document.createElement("button");

        button.innerHTML = "Delete";

        button.className = "delete";

        button.onclick = function() {
            deleteTransaction(i);
        };

        li.appendChild(button);

        list.appendChild(li);

    }

    // Calculate balance
    let balance = income - expense;

    document.getElementById("income").innerHTML = "₹" + income;

    document.getElementById("expense").innerHTML = "₹" + expense;

    document.getElementById("balance").innerHTML = "₹" + balance;

}

// Delete Transaction
function deleteTransaction(index) {

    // Remove selected record
    transactions.splice(index, 1);

    // Update LocalStorage
    saveData();

    // Refresh display
    displayData();

}

// Load records when page opens
displayData();

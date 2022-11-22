var results = document.getElementById('results');
var id = document.getElementById('id');
var firstName = document.getElementById('firstName');
var lastName = document.getElementById('lastName');
var phone = document.getElementById('phone');

var createStatement = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, phone TEXT)";
var selectAllStatement = "SELECT * FROM Contacts";
var insertStatement = "INSERT INTO Contacts (firstName, lastName, phone) VALUES (?, ?, ?)";
var updateStatement = "UPDATE Contacts SET firstName = ?, lastName = ?, phone = ? WHERE id = ?";
var deleteStatement = "DELETE FROM Contacts WHERE id=?";
var dropStatement = "DROP TABLE Contacts";

var db = openDatabase("Sample", "1.0", "New", 200000);
var dataset;
createTable();

function onError(tx, error) {
    alert(error.message);
}

function showRecords() {
    results.innerHTML = '<div id="new">No &nbsp&nbsp FirstName &nbsp&nbsp LastName &nbsp &nbsp Mobile &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp options</div><hr style="height:1px;background-color:#fff";> ';
    db.transaction(function (tx) {
        tx.executeSql(selectAllStatement, [], function (tx, result) {
            dataset = result.rows;
            for (var i = 1, item = null; i < dataset.length; i++) {
                item = dataset.item(i);
                results.innerHTML +=
                    '<li>'+ i +' ) &nbsp&nbsp'+ item['firstName'] + '&nbsp&nbsp&nbsp' + item['lastName'] + ' &nbsp&nbsp&nbsp ' + item['phone'] + ' - ' + '<button class="btn btn-outline-info href="#" onclick="loadRecord(' + i + ')">Edit</button>  ' +
                    '<button class="btn btn-outline-danger" href="#" onclick="deleteRecord(' + item['id'] + ')">Delete</button></li>';
            }
            
        });
    });
}

function createTable() {
    db.transaction(function (tx) {
        tx.executeSql(createStatement, [], showRecords, onError);
    });
}

function insertRecord() {
    db.transaction(function (tx) {
        tx.executeSql(insertStatement, [firstName.value, lastName.value, phone.value], loadAndReset, onError);
    });
    
}

function loadRecord(i) {
    var item = dataset.item(i);
    firstName.value = item['firstName'];
    lastName.value = item['lastName'];
    phone.value = item['phone'];
    id.value = item['id'];
}

function updateRecord() {
    db.transaction(function (tx) {
        tx.executeSql(updateStatement, [firstName.value, lastName.value, phone.value, id.value], loadAndReset, onError);
    });
}

function deleteRecord(id) {
    db.transaction(function (tx) {
        tx.executeSql(deleteStatement, [id], showRecords, onError);
    });
    resetForm();
}

function dropTable() {
    db.transaction(function (tx) {
        tx.executeSql(dropStatement, [], showRecords, onError);
    });
    resetForm();
}

function loadAndReset() {
    resetForm();
    showRecords();
}

function resetForm() {
    firstName.value = '';
    lastName.value = '';
    phone.value = '';
    id.value = '';
}
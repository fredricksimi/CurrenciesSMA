function addcontent() {
    document.querySelector('.add').style.display = 'contents';
    document.querySelector('.view').style.display = 'none';
    document.querySelector('.edit').style.display = 'none';
    document.querySelector('.delete').style.display = 'none';
}

function viewcontent() {
    document.querySelector('.view').style.display = 'contents';
    document.querySelector('.add').style.display = 'none';
    document.querySelector('.edit').style.display = 'none';
    document.querySelector('.delete').style.display = 'none';
}

function editcontent() {
    document.querySelector('.edit').style.display = 'contents';
    document.querySelector('.add').style.display = 'none';
    document.querySelector('.view').style.display = 'none';
    document.querySelector('.delete').style.display = 'none';
}

function deletecontent() {
    document.querySelector('.delete').style.display = 'contents';
    document.querySelector('.add').style.display = 'none';
    document.querySelector('.view').style.display = 'none';
    document.querySelector('.edit').style.display = 'none';
}

//ADDING CAPABILITY
const server = 'http://localhost:4000';
var currencyId;
var currencyName;
var currencyRate;

var oldCurrencyName

var newCurrencyName;
var newCurrencyId;
var newcurrencyRate;

var deleteCurrencyId;

var dCurrencyId;
var dCurrencyName;
var dcurrencyRate

async function fetchCurrencies() {
    const url = server + '/currencies';
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }
    const response = await fetch(url, options);
    const currencies = await response.json();
    populateContent(currencies);
}

async function addCurrency() {
    const url = server + '/currencies';
    const currencies = { id: currencyId, name: currencyName, rate: currencyRate };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currencies)
    }
    const response = await fetch(url, options);
}

async function editCurrency(sName) {
    const url = server + `/currencies/${sName}`;
    const currencies = { id: newCurrencyId, name: newCurrencyName, rate: newcurrencyRate };
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currencies)
    }
    const response = await fetch(url, options);
}

// Delete function
async function deleteCurrency(sId) {
    const url = server + `/currencies/${sId}`;
    const currencies = { id: dCurrencyId, name: dCurrencyName, rate: dcurrencyRate };
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currencies)
    }
    const response = await fetch(url, options);
}


function populateContent(currenciez) {
    var table = document.getElementById('content');
    table.innerHTML = "<tr><th></th><th> View All Currency Records<th></th></th></tr><tr><th>Currency ID</th><th>Currency Name</th><th>Exchange Rate</th></tr>";
    currenciez.forEach(currency => {
        var row = document.createElement('tr');
        var dataId = document.createElement('td');
        var textId = document.createTextNode(currency.id);
        dataId.appendChild(textId);
        var dataName = document.createElement('td');
        var textName = document.createTextNode(currency.name);
        dataName.appendChild(textName);
        var dataRate = document.createElement('td');
        var textRate = document.createTextNode(currency.rate);
        dataRate.appendChild(textRate);
        row.appendChild(dataId);
        row.appendChild(dataName);
        row.appendChild(dataRate);
        table.appendChild(row);
    });
}


var myeurl;
var i;
var emptyList = [];
function getNames() {
  $.getJSON("/currencies", function(data) {
    myeurl = data;
    for(i = 0; i < myeurl.length; i++){
      emptyList.push(myeurl[i]["id"])
    }


    document.querySelector('form').addEventListener('submit', (e) => {

        currencyId = document.getElementById('currencyId').value;
        currencyName = document.getElementById('currencyName').value;
        currencyRate = document.getElementById('currencyRate').value;
        if (emptyList.includes(currencyId)){
          window.alert('There is an existing Currency ID')
          clear();
          return;
        } else if (currencyId.length != 4  && currencyName === " ") {
            window.alert("Currency ID should have 4 characters!");
            clear();
            return;
        } else if (currencyRate < 0) {
            window.alert("Rate should not be below 0");
            clear();
            return;
        }
        if (currencyId && currencyName && currencyRate) {

            addCurrency();
            fetchCurrencies();
            window.alert("Currency details added successfully!");
            clear();

        }
        e.preventDefault();

        function clear() {
            currencyId = document.getElementById('currencyId').value = "";
            currencyName = document.getElementById('currencyName').value = "";
            currencyRate = document.getElementById('currencyRate').value = "";
        }
    });

  });
}
getNames()



// VIEW FUNCTIONALITY

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search currencies.json and filter it
const searchCurrencies = async searchText => {
    const response = await fetch(server + '/currencies');
    const currencies = await response.json();

    // Get matches to current text input
    let matches = currencies.filter(currency => {
        const regex = new RegExp(`${searchText}`, 'gi');
        return currency.name.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <div>
            <p>${match.id}  ${match.name}  (${match.rate})</p>
        </div>
        `).join('');

        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchCurrencies(search.value));


// EDIT FUNCTIONALITY

const editSearch = document.getElementById('editSearch');
const editList = document.getElementById('edit-list');

// Search currencies.json and filter it
const editCurrencies = async searchText => {
    const response = await fetch(server + '/currencies');
    const currencies = await response.json();

var the_c_name = [];
for(i=0; i < currencies.length; i++){
  the_c_name.push(currencies[i]["name"]);
}



    // Get matches to current text input
    let matches = currencies.filter(currency => {
        const regex = new RegExp(`${searchText}`, 'gi');
        return currency.id.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        editList.innerHTML = '';
    }

    output(matches);
};

// Show results in HTML
const output = matches => {

    if (matches.length > 0) {

        matches.map(m => {
            oldCurrencyName = m.id;
            console.log(oldCurrencyName)
        });
        const html = matches.map(match =>
            `
        <form id="EDIT">
        <label class="font-weight-bold">EDIT CURRENCY DETAILS</label>
            <div class="form-group">
                <div class="d-inline mw-100">Currency ID: </>
                <div class="d-inline"  id="newID" > ${match.id}
            </div>
            <div class="form-group">
                <div class="d-inline">Currency Name: </>
                <div name="name" class="d-inline" contenteditable="true" id="newName"> ${match.name} </>
            </div>
            <div class="form-group">
                <div class="d-inline">Final Rate: </>
                <div class="d-inline" contenteditable="true" id="newRate"> ${match.rate} </>
            </div>
            <button type="submit" class="btn btn-success d-block w-100 mb-5">EDIT</button>
        </form>


        `).join('');

        editList.innerHTML = html;

        EDIT.addEventListener('submit', (e) => {
            newCurrencyId = document.querySelector('#newID').innerHTML;
            newCurrencyName = document.querySelector('#newName').innerHTML;
            newcurrencyRate = document.querySelector('#newRate').innerHTML;

            if (newcurrencyRate < 0) {
                window.alert("Rate should not be below 0");
                clear();
                return;
            }
            editCurrency(oldCurrencyName);
            fetchCurrencies();
            window.alert("Currency details editted successfully!");
            window.clear();
            e.preventDefault();
        });
    }
}


editSearch.addEventListener('input', () => editCurrencies(editSearch.value));


// DELETE FUNCTIONALITY

const deleteSearch = document.getElementById('deleteSearch');
const deleteList = document.getElementById('delete-list');

// Search currencies.json and filter it
const deleteCurrencies = async searchText => {
    const response = await fetch(server + '/currencies');
    const currencies = await response.json();

    // Get matches to current text input
    let matches = currencies.filter(currency => {
        const regex = new RegExp(`${searchText}`);
        return currency.id.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        deleteList.innerHTML = '';
    }

    output2(matches);
};

// Show results in HTML
const output2 = matches => {

    if (matches.length > 0) {

        matches.map(m => {
            deleteCurrencyId = m.id;
            console.log(deleteCurrencyId)
        });
        const html = matches.map(match =>
            `
        <form id="DELETE">
        <label class="font-weight-bold">DELETE CURRENCY DETAILS</label>
            <div class="form-group">
                <div class="d-inline mw-100">Currency ID: </>
                <div class="d-inline" contenteditable="true" id="newCurrencyId" > ${match.id} </>
            </div>
            <div class="form-group">
                <div class="d-inline">Currency Name: </>
                <div name="name" class="d-inline" contenteditable="true" id="newCurrencyName"> ${match.name} </>
            </div>
            <div class="form-group">
                <div class="d-inline">Final Rate: </>
                <div class="d-inline" contenteditable="true" id="newCurrencyRate"> ${match.rate} </>
            </div>
            <button type="submit" class="btn btn-danger d-block w-100 mb-5">DELETE</button>
        </form>


        `).join('');

        deleteList.innerHTML = html;

        DELETE.addEventListener('submit', (e) => {
            dCurrencyId = document.querySelector('#newCurrencyId').innerHTML;
            dCurrencyName = document.querySelector('#newCurrencyName').innerHTML;
            dCurrencyRate = document.querySelector('#newCurrencyRate').innerHTML;

            deleteCurrency(deleteCurrencyId);
            fetchCurrencies();
            window.alert("Currency details deleted successfully!");
            window.clear();
            e.preventDefault();
        });
    }
}


deleteSearch.addEventListener('input', () => deleteCurrencies(deleteSearch.value));






// name actions
// jonsnow edit delete

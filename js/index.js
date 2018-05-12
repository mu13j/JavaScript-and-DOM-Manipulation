// Get references to the tbody element
var $tbody = document.querySelector("tbody");
// Get references for input fields 
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput  = document.querySelector("#shape");
// Get references for buttons
var $searchBtn = document.querySelector("#search");
var $resetBtn = document.querySelector("#reset");
var $leftBtn = document.querySelector('#left');
var $rightBtn = document.querySelector('#right');
// Set filteredAddresses to addressData initially
var filteredAddresses = dataSet;

// Set Results Per Page
var resultsPerPage = 1200;

// Column Headers
var fields = Object.keys(filteredAddresses[0]);

// Creating Pagination Buttons
for (var i =2; i<Math.ceil(filteredAddresses.length/resultsPerPage)+1; i++) {
  var $number = d3.select('.btn-group')
  var $label = $number.append('label').attr('id',i).attr('class','btn btn-primary').text('page '+i).attr('onclick','ButtonClick(this.id)')
  var $button = $label.append('input').attr('type','radio').attr('name','options').attr('autocomplete','off')
}

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$resetBtn.addEventListener("click", handleResetButtonClick);


// Last page
var lastPage = Math.ceil(filteredAddresses.length/resultsPerPage)-1

// Page Button Functionality
var $currentPage=0
function ButtonClick(number){
  $currentPage = number-1;
  renderTable()
}

// Printing out 1500 results
function renderTable() {
  if ($currentPage<lastPage) {
    $tbody.innerHTML = "";
    for (var i = 0; i < resultsPerPage; i++) {
      // Get get the current address object and its fields
      var initialPoint = resultsPerPage*$currentPage
      var address = filteredAddresses[i+initialPoint];
      // Create a new row in the tbody, set the index to be i + startingIndex
      var $row = $tbody.insertRow(i);
      for (var j = 0; j < fields.length; j++) {
        // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
        var field = fields[j];
        var $cell = $row.insertCell(j);
        $cell.innerText = address[field];
      }
    }
  }
  else {
    $tbody.innerHTML = "";
    for (var i = 0; i < filteredAddresses.length%resultsPerPage; i++) {
      // Get get the current address object and its fields
      var initialPoint = resultsPerPage*$currentPage
      var address = filteredAddresses[i+initialPoint];
      // Create a new row in the tbody, set the index to be i + startingIndex
      var $row = $tbody.insertRow(i);
      for (var j = 0; j < fields.length; j++) {
        // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
        var field = fields[j];
        var $cell = $row.insertCell(j);
        $cell.innerText = address[field];
      }
    }
  }
}

//Search Button Functionality
function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = $dateInput.value.trim().toLowerCase();
  var filterCity= $cityInput.value.trim().toLowerCase();
  var filterState= $stateInput.value.trim().toLowerCase();
  var filterCountry= $countryInput.value.trim().toLowerCase();
  var filterShape= $shapeInput.value.trim().toLowerCase();

  // Set filteredAddresses to an array of all addresses whose DateTime/other criteria matches the filter
  if (filterDate !== '') {
    filteredAddresses = filteredAddresses.filter(function(address) {
    var addressDate = address.datetime;
    return addressDate === filterDate;
  })}
  if (filterCity !== ''){
    filteredAddresses = filteredAddresses.filter(function(address) {
        var addressCity = address.city;
        return addressCity === filterCity;
  })}

  if (filterState !== '') {
    filteredAddresses = filteredAddresses.filter(function(address) {
    var addressState = address.state;
    return addressState === filterState;
  })}

  if (filterCountry !== ''){
    filteredAddresses = filteredAddresses.filter(function(address) {
        var addressCountry = address.country;
        return addressCountry === filterCountry;
  })}

  if (filterShape !== ''){
    filteredAddresses = filteredAddresses.filter(function(address) {
        var addressShape = address.shape;
        return addressShape === filterShape;
  })}

  renderTable();
  filteredAddresses=dataSet;
}

function handleResetButtonClick() {
    filteredAddresses=dataSet;
    renderTable();
    console.log('reset');
    $dateInput.value='';
    $cityInput.value='';
    $stateInput.value='';
    $countryInput.value='';
    $shapeInput.value='';
}
// Render the table for the first time on page load
renderTable();
 

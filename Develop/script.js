// Assignment code here
var criteria = {};

function generatePassword() {
  collectInfo();
  if (!validateInfo()) {
    if(confirm("Retry?")) {
      generatePassword();
    } else {
      return "";
    }
  }
  return "Test";
}

function collectInfo() { //gather info for the criteria of a password
  criteria.minLength = prompt("Minimum character length:");
  // console.log(typeof(criteria.minLength))
  criteria.maxLength = prompt("Maximum password length:")
  criteria.useLowerCase = confirm("Do you want to include lower case characters?")
  criteria.useUpperCase = confirm("Do you want to include upper case characters?")
  criteria.useNumeric = confirm("Do you want to include numeric values?")
  criteria.useSpecial = confirm("Do you want to include special characters?")
}

function validateInfo() { //validate that the info in the criteria are legitimate values
  var goodPassword = true;
  if(!(typeof(criteria.minLength) === 'number')  || (criteria.minLength <= 0)) { //check if minLength is good
    alert("The minimum password length must be greater than 0.")
    goodPassword = false;
  }
  if(!(typeof(criteria.maxLength) === 'number')  || (criteria.maxLength < criteria.minLength)) {//check if maxLength is good
    alert("The maximum password length must be greater than or equal to the minimum length.")
    goodPassword = false;
  }
  if(criteria.useLowerCase == false &&
     criteria.useUpperCase == false &&
     criteria.useNumeric == false &&
     criteria.useSpecial == false) { //make sure not all the character types are false
    alert("At least one character type must be used.")
    goodPassword = false;
  }
  return goodPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

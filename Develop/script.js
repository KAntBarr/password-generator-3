// Assignment code here
var criteria = {};//global password criteria object
var lower_case_set = "abcdefghijklmnopqrstuvwxyz";
var upper_case_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numeric_set = "0123456789";
var special_set = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

function generatePassword() {
  collectInfo();//get info
  if (!validateInfo()) {//validate info
    if(confirm("Retry?")) {
      generatePassword();//retry to get info
    } else {
      return "";//else return nothing
    }
  }
  return createPassword();//return the generated secure password
}

function collectInfo() { //gather info for the criteria of a password
  criteria.minLength = prompt("Minimum character length:");
  criteria.maxLength = prompt("Maximum password length:")
  criteria.useLowerCase = confirm("Do you want to include lower case characters?")
  criteria.useUpperCase = confirm("Do you want to include upper case characters?")
  criteria.useNumeric = confirm("Do you want to include numeric values?")
  criteria.useSpecial = confirm("Do you want to include special characters?")
}

function validateInfo() { //validate that the info in the criteria are legitimate values
  var goodPassword = true;
  if( isNaN(criteria.minLength) || (criteria.minLength <= 0)) { //check if minLength is good
    alert("The minimum password length must be greater than 0.")
    goodPassword = false;
  }
  criteria.minLength = Number(criteria.minLength);
  if( isNaN(criteria.maxLength) || (criteria.maxLength < criteria.minLength)) {//check if maxLength is good
    alert("The maximum password length must be greater than or equal to the minimum length.")
    goodPassword = false;
  }
  criteria.maxLength = Number(criteria.maxLength);
  if(criteria.useLowerCase == false &&
     criteria.useUpperCase == false &&
     criteria.useNumeric == false &&
     criteria.useSpecial == false) { //make sure not all the character types are false
    alert("At least one character type must be used.")
    goodPassword = false;
  }
  return goodPassword;
}

function createPassword() {//create the password with the given criteria
  var password_set = ""; //add corresponding character sets to password set
  if(criteria.useLowerCase) password_set += lower_case_set;
  if(criteria.useUpperCase) password_set += upper_case_set;
  if(criteria.useNumeric) password_set += numeric_set;
  if(criteria.useSpecial) password_set += special_set;
  criteria.passwordLength = randomIntFromInterval(criteria.minLength, criteria.maxLength);//get random password length
  var securePassword = "";
  for(var i = 0; i<criteria.passwordLength; i++){//loop through and add a random character to the password per iteration
    securePassword += password_set[randomIntFromInterval(0, password_set.length)];
  }
  return securePassword;
}

function randomIntFromInterval(min, max) { //gets a random integer within an interval
  return Math.floor(Math.random() * (max - min + 1) + min)// min and max included 
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

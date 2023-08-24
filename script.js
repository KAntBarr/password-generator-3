// Assignment code here
var criteria = {};//global password criteria object
var lower_case_set = "abcdefghijklmnopqrstuvwxyz";
var upper_case_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numeric_set = "0123456789";
var special_set = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var password_set = "";

function generatePassword() {
  collectInfo();//get info
  if (!validateInfo()) {//validate info
    if(confirm("Retry?")) {//if bad info, retry or return nothing
      generatePassword();//retry to get info
    } else {
      return "";//else return nothing
    }
  }
  return createPassword();//return the generated secure password
}

function collectInfo() { //gather info for the criteria of a password
  criteria.pwLength = prompt("Choose Password Length:");
  criteria.useLowerCase = confirm("Do you want to include lower case characters?")
  criteria.useUpperCase = confirm("Do you want to include upper case characters?")
  criteria.useNumeric = confirm("Do you want to include numeric values?")
  criteria.useSpecial = confirm("Do you want to include special characters?")
}

function validateInfo() { //validate that the info in the criteria are legitimate values
  var goodPassword = true;
  if(!(Number(criteria.pwLength)>=8) || !(Number(criteria.pwLength)<=128)) {
    alert("The password length must be between 8 and 128 characters.");
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

function createPassword() {//create the password with the given criteria
  password_set = ""; //add corresponding character sets to password set
  if(criteria.useLowerCase) password_set += lower_case_set;
  if(criteria.useUpperCase) password_set += upper_case_set;
  if(criteria.useNumeric) password_set += numeric_set;
  if(criteria.useSpecial) password_set += special_set;
  var securePassword = "";
  var char = '';
  for(var i = 0; i<criteria.pwLength; i++){//loop through and add a random character to the password per iteration
    char = password_set[randomIntFromInterval(0, password_set.length-1)];
    if(!char) console.log(char, i, password_set.length)
    securePassword += char;
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

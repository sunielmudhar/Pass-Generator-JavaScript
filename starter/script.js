// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

var passOptions = [
  {
    length: 0,
    lower: false,
    upper: false,
    numeric: false,
    specialChars: false,
    duplicates: false,

    checkPassOptions() {
      if (!this.lower && !this.upper && !this.numeric && !this.specialChars) {
        alert("Please select at least one character type option!");
        return false;
      }
      return true;
    }
  }
];

var pass = "";

// Function to prompt user for password options
function getPasswordOptions() {

  while (passOptions.length > 128 || passOptions.length < 8 ) {
    passOptions.length         = prompt("Please enter the length of the password you would like: ");
  }

  do {
    passOptions.lower          = prompt("Would you like to add lowercase characters Y/N?");
    passOptions.upper          = prompt("Would you like to add uppercase characters Y/N?");
    passOptions.numeric        = prompt("Would you like to add numeric characters Y/N?");
    passOptions.specialChars   = prompt("Would you like to add special characters Y/N?");
    passOptions.duplicates     = prompt("Would you like to allow duplicate characters Y/N?");
  } while (!passOptions)

}

// Function to get random array
function getArray() {
  var rndArr = Math.floor(Math.random() * 4);
  return rndArr;
}

// Function for getting a random element from an array
function getRandom(arr) {

  var rnd = Math.floor(Math.random() * (arr.length));

  if (!passOptions.duplicates) {
    return arr.pop(rnd);
  }

  return arr[rnd];

}

// Function to generate password with user input
function generatePassword() {

  passOptions.length = 0; // Reinitialise length of pass
  getPasswordOptions();
  
  var i = 0;

  //Create pass in while loop depending on user stated password length (passOptions.length)
  while (i < passOptions.length) {

    var arrayType = getArray();

    switch (arrayType) {
      case 0:
        if(!passOptions.specialCharacters) {
          i--;
          break;
        }
        pass = pass.concat(getRandom(specialCharacters));
        break;
      case 1:
        if(!passOptions.numeric) {
          i--;
          break;
        }
        pass = pass.concat(getRandom(numericCharacters));
        break;
      case 2:
        if(!passOptions.lower) {
          i--;
          break;
        }
        pass = pass.concat(getRandom(lowerCasedCharacters));
        break;
      case 3:
        if(!passOptions.upper) {
          i--;
          break;
        }
        pass = pass.concat(getRandom(upperCasedCharacters));
        break;
    }

    i++;

  }

  return pass;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();  
  var passwordText = document.querySelector('#password');

  passwordText.value = ""; // Reset password after generate pass pressed
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T",
"U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z"];

const numberCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbolCharacters = ["~","`","!","@","#",
"$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"]

const firstPasswordEl = document.getElementById("first-password-el");
const secondPasswordEl = document.getElementById("second-password-el");
const lengthInputEl = document.getElementById("length-input-el");
const numbersSwitchEl = document.querySelector("#numbers-switch-el input");
const symbolsSwitchEl = document.querySelector('#symbols-switch-el input');

const generatePasswordsBtn = document.getElementById("generate-btn");
const MAX_PASSWORD_LENGTH = 15;


document.body.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    renderPasswords();
  }
});

generatePasswordsBtn.addEventListener("click", () => {
  renderPasswords();
});

numbersSwitchEl.addEventListener("change", () => {
  if (isToggleChecked(numbersSwitchEl)) {
    addAddtionalCharacters(numberCharacters);
  } else if (characters.includes(numberCharacters[0])) {
    removeAdditionalCharacters(numberCharacters);
  }
});

symbolsSwitchEl.addEventListener("change", () => {
  if (isToggleChecked(symbolsSwitchEl)) {
    addAddtionalCharacters(symbolCharacters);
  } else if (characters.includes(symbolCharacters[0])) {
    removeAdditionalCharacters(symbolCharacters);
  }
});

function isToggleChecked(toggleEl) {
  if (toggleEl.checked) {
    return true;
  } else return false;
}

function addAddtionalCharacters(newCharacters) {
  for (let i = 0; i < newCharacters.length; i++) {
    characters.push(newCharacters[i]);
  }
}

function removeAdditionalCharacters(expiredCharacters) {
  for (let i = 0; i < expiredCharacters.length; i++) {
    const index = characters.indexOf(expiredCharacters[i]);
    if (index > -1) {
      characters.splice(index, 1);
    }
  }
}


function renderPasswords() {
  const passwordLength = getPasswordLength();
  

  if (passwordLength > MAX_PASSWORD_LENGTH) {
    lengthInputEl.value = "";
    alert(`Password length cannot exceed ${MAX_PASSWORD_LENGTH} characters.`);
    return;
  }

  const firstPassword = generatePassword(passwordLength);
  const secondPassword = generatePassword(passwordLength);

  resetPasswords();

  const firstTooltipImage = createClipboardTooltip();
  const secondTooltipImage = createClipboardTooltip();

  addClipboardEvent(firstTooltipImage, secondTooltipImage);

  firstPasswordEl.append(firstPassword, firstTooltipImage);
  secondPasswordEl.append(secondPassword, secondTooltipImage);


  firstPasswordEl.focus();
}

function getPasswordLength() {
  return lengthInputEl.value || lengthInputEl.getAttribute("placeholder");
}

function generatePassword(length) {
  const passwordArray = Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  });
  return passwordArray.join("");
}

function resetPasswords() {
  firstPasswordEl.textContent = "";
  secondPasswordEl.textContent = "";
}

function createClipboardTooltip() {
  const tooltip = document.createElement("img");
  tooltip.src = "copy.png";
  tooltip.classList.add("tooltip");
  return tooltip;
}

function addClipboardEvent(firstTooltipImage, secondTooltipImage) {
  firstTooltipImage.addEventListener("click", () => {
    copyToClipboard(firstPasswordEl.textContent);
  });

  secondTooltipImage.addEventListener("click", () => {
    copyToClipboard(secondPasswordEl.textContent);
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
}

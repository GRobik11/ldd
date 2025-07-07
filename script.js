const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");
const animationData = [
  {
    inputVal: 5,
    marginTop: 300,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    marginTop: -200,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    marginTop: -200,
    addElDelay: 2000,
    msg: 'decimalToBinary(1) returns "1" (base case) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 5000,
    removeElDelay: 10000,
  }
];

const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

const showAnimation = () => {
  result.innerText = "Call Stack Animation";

  animationData.forEach((obj) => {
    setTimeout(() => {
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px;" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  setTimeout(() => {
    result.textContent = decimalToBinary(5);
    animationContainer.innerHTML = "";
  }, 20000);
};

const checkUserInput = () => {
    const inputInt = parseInt(numberInput.value);
  
    if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
      alert("Please provide a decimal number greater than or equal to 0");
      return;
    }
  
    if (inputInt === 5) {
      showAnimation();
      return;
    }
  
    result.textContent = decimalToBinary(inputInt);
    numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);
  
numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkUserInput();
    }
});

const unitValueInput = document.getElementById("unit-value");
const fromUnitSelect = document.getElementById("from-unit");
const toUnitSelect = document.getElementById("to-unit");
const unitConvertBtn = document.getElementById("unit-convert-btn");
const unitResult = document.getElementById("unit-result");

const conversionFactors = {
  meters: 1,
  centimeters: 0.01,
  kilometers: 1000,
  inches: 0.0254,
  feet: 0.3048,
  yards: 0.9144,
  miles: 1609.34
};

const convertUnits = () => {
  const value = parseFloat(unitValueInput.value);
  const fromUnit = fromUnitSelect.value;
  const toUnit = toUnitSelect.value;

  if (isNaN(value)) {
    alert("Please enter a valid number");
    return;
  }

  const valueInMeters = value * conversionFactors[fromUnit];
  const convertedValue = valueInMeters / conversionFactors[toUnit];

  unitResult.textContent = `${value} ${fromUnit} = ${convertedValue.toFixed(6)} ${toUnit}`;
  unitValueInput.value = "";
};

unitConvertBtn.addEventListener("click", convertUnits);

unitValueInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    convertUnits();
  }
});
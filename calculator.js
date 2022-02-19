function add(num1, num2) {
	return num1 + num2;
};

function subtract(num1, num2) {
	return num1 - num2;
};
function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1 / num2;
};

function operate(operator, num1, num2) {
    if (operator === 'add') {
        return add(num1, num2);
    } else if (operator === 'subtract') {
        return subtract(num1, num2);
    } else if (operator === 'multiply') {
        return multiply(num1, num2);
    } else if (operator === 'divide') {
        return divide(num1, num2);
    }
}

// Source: https://stackoverflow.com/questions/32229667/have-max-2-decimal-places/32229831
function toFixedIfNecessary(value, dp) {
    return +parseFloat(value).toFixed(dp);
}

const container = document.querySelector('#container');
const display = document.querySelector('.display');

const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const point = document.querySelector('#point');
const equals = document.querySelector('#equals');

const backspace = document.querySelector('#backspace');
const clear = document.querySelector('#clear');

let value1 = '';
let value2 = '';
let valueAfterEquals = '';
let operatorValue = '';

let isValue1Decimal = false;
let isValue2Decimal = false;

digits.forEach((digit) => {
    digit.addEventListener('click', (e) => {
        if (valueAfterEquals !== '') {
            valueAfterEquals = '';
            isValue1Decimal = false;
            value1 = e.target.id;
            display.textContent = e.target.id;
        } else if (operatorValue === '') {
            value1 += e.target.id;
            display.textContent += e.target.id;
        } else if (operatorValue !== '') {
            value2 += e.target.id;
            display.textContent += e.target.id;
        }
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        if (valueAfterEquals !== '') {
            value1 = valueAfterEquals;
            valueAfterEquals = '';
            if (Number(value1) % 1 === 0) {
                isValue1Decimal = false;
            }
            operatorValue = e.target.id;
            display.textContent += ' ' + e.target.textContent + ' ';
            console.log(value1);
        } else if (value2 === '') {
            operatorValue = e.target.id;
            display.textContent = value1 + ' ' + e.target.textContent + ' ';
        } else if (value2 !== '') {
            let total = 0;

            total = operate(operatorValue, Number(value1), Number(value2));
            total = toFixedIfNecessary(total, 5);

            value1 = String(total);
            value2 = '';
            isValue2Decimal = false;
            operatorValue = e.target.id;
            display.textContent = total + ' ' + e.target.textContent + ' ';
        }
    });
});

point.addEventListener('click', (e) => {
    if (valueAfterEquals !== '') {
        isValue1Decimal = true;
        valueAfterEquals = '';
        value1 = '0.';
        display.textContent = '0.';
    } else if (operatorValue === '' && isValue1Decimal === false && value1 !== 'Infinity' && value1 !== 'NaN') {
        isValue1Decimal = true;
        if (value1.length === 0) {
            value1 += '0.';
            display.textContent += '0.';
        } else {
            value1 += '.';
            display.textContent += '.';
        }
    } else if (operatorValue !== '' && isValue2Decimal === false) {
        isValue2Decimal = true;
        if (value2.length === 0) {
            value2 += '0.';
            display.textContent += '0.';
        } else {
            value2 += '.';
            display.textContent += '.';
        }
    }
});

equals.addEventListener('click', (e) => {
    if (value2 === '' || operatorValue === '') {} 
    else if (value2 !== '' && operatorValue !== '') {
        let total = 0;

        total = operate(operatorValue, Number(value1), Number(value2));
        total = toFixedIfNecessary(total, 5);

        value1 = '';
        value2 = '';
        isValue2Decimal = false;
        valueAfterEquals = String(total);
        operatorValue = '';
        display.textContent = total;
    }
});

backspace.addEventListener('click', (e) => {
    if (valueAfterEquals !== '') {
        valueAfterEquals = '';
        isValue1Decimal = false;
        display.textContent = '';
    } else if (operatorValue !== '') {
        if (value2 !== '') {
            if (value2.charAt(value2.length - 1) === '.') {
                isValue2Decimal = false;
            }
            value2 = value2.substring(0, value2.length - 1);
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);
        } else if (value2 === '') {
            operatorValue = '';
            display.textContent = display.textContent.substring(0, display.textContent.length - 3);
        }
    } else if (operatorValue === '') {
        if (value1 !== '' && value1 !== 'Infinity' && value1 !== 'NaN') {
            if (value1.charAt(value1.length - 1) === '.') {
                isValue1Decimal = false;
            }
            value1 = value1.substring(0, value1.length - 1);
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);
        } else if (value1 === 'Infinity' || value1 === 'NaN') {
            value1 = '';
            display.textContent = '';
        }
    } 
});

clear.addEventListener('click', (e) => {
    value1 = '';
    value2 = '';
    valueAfterEquals = '';
    operatorValue = '';
    isValue1Decimal = false;
    isValue2Decimal = false;
    display.textContent = '';
});
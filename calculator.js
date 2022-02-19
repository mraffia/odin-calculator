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
    if(operator === 'add') {
        return add(num1, num2);
    } else if(operator === 'subtract') {
        return subtract(num1, num2);
    } else if(operator === 'multiply') {
        return multiply(num1, num2);
    } else if(operator === 'divide') {
        return divide(num1, num2);
    }
}

// Source: https://stackoverflow.com/questions/32229667/have-max-2-decimal-places/32229831
function toFixedIfNecessary(value, dp) {
    return +parseFloat(value).toFixed(dp);
}

const container = document.querySelector('#container');
const display = document.querySelector('.display');

const backspace = document.querySelector('#backspace');
const clear = document.querySelector('#clear');

const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('#equals');

let value1 = '';
let value2 = '';
let valueAfterEquals = '';
let operatorValue = '';

digits.forEach((digit) => {
    digit.addEventListener('click', (e) => {
        if(valueAfterEquals !== '') {
            valueAfterEquals = '';
            value1 += e.target.id;
            display.textContent = e.target.id;
        } else if(operatorValue === '') {
            value1 += e.target.id;
            display.textContent += e.target.id;
        } else if(operatorValue !== '') {
            value2 += e.target.id;
            display.textContent += e.target.id;
        }
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        if(valueAfterEquals !== '') {
            value1 = valueAfterEquals;
            valueAfterEquals = '';
            operatorValue = e.target.id;
            display.textContent += ' ' + e.target.textContent + ' ';
        } else if(value2 === '') {
            operatorValue = e.target.id;
            display.textContent = value1 + ' ' + e.target.textContent + ' ';
        } else if(value2 !== '') {
            let total = 0;

            total = operate(operatorValue, Number(value1), Number(value2));
            total = toFixedIfNecessary(total, 5);

            value1 = String(total);
            value2 = '';
            operatorValue = e.target.id;
            display.textContent = total + ' ' + e.target.textContent + ' ';
        }
    });
});

equals.addEventListener('click', (e) => {
    if(value2 === '' || operatorValue === '') {} 
    else if(value2 !== '' && operatorValue !== '') {
        let total = 0;

        total = operate(operatorValue, Number(value1), Number(value2));
        total = toFixedIfNecessary(total, 5);

        value1 = '';
        value2 = '';
        valueAfterEquals = String(total);
        operatorValue = '';
        display.textContent = total;
    }
});

clear.addEventListener('click', (e) => {
    value1 = '';
    value2 = '';
    valueAfterEquals = '';
    operatorValue = '';
    display.textContent = '';
});

function add(a, b) {
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    return a/b;
}

function operate(operator, num1, num2){
    if(operator === "+"){
        return add(num1, num2);
    } else if(operator === "-"){
        return subtract(num1, num2);
    } else if(operator === "*"){
        return multiply(num1, num2);
    } else if(operator === "/"){
        return divide(num1, num2);
    } else{
        return `Operator ${operator} hasn't been implemented yet.`;
    }
}

const display = document.querySelector(".display");

let expression = {
    operator: "",
    operandA: "",
    operandB: "",
}

function getDisplayContent(){
    return display.textContent;
}

function clearDisplay(){
    display.textContent = "";
    expression.operator = "";
    expression.operandA = "";
    expression.operandB = "";
    toggleDecimalButton();
}

function toggleDecimalButton() {
    decimalButton.disabled = false;
}

function setOperand(event) {
    if(!expression.operator){
        // operandA
        display.textContent = getDisplayContent() + event.target.textContent;
        expression.operandA = display.textContent;
    } else {
        // operator and operandA set
        // this is operandB
        expression.operandB += event.target.textContent;
        display.textContent += event.target.textContent;
    }
}

function buildOperation(event) {
    if(!expression.operandA || (expression.operator && !expression.operandB)) {
        console.log("adieu");
        return;
    }
    if(!expression.operandB){
        // still building the expression. update the operator and and the display
        if(event.target.textContent !== "="){
            expression.operator = event.target.textContent;
            display.textContent += ` ${expression.operator} `;
            toggleDecimalButton();
        }
        return;
    }
    // at this stage, we have both operands and an operator
    toggleDecimalButton();
    console.log(`Operator: ${expression.operator}, ${expression.operandA}, ${expression.operandB}`);
    const result = operate(expression.operator, +expression.operandA, +expression.operandB);
    expression.operandA = `${result}`;

    if(event.target.textContent === "="){
        display.textContent = result;
        expression.operator = "";
        expression.operandB = "";
    } else {
        expression.operator = event.target.textContent;
        expression.operandB = "";
        display.textContent = result + ` ${event.target.textContent} `;

    }
}

const numberButtons = document.querySelectorAll("button.number");
numberButtons.forEach((button) => {
    button.addEventListener('click', setOperand);
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
    button.addEventListener('click', buildOperation);
});

const clearButton = document.querySelector("button.clear");
clearButton.addEventListener('click', clearDisplay);

const decimalButton = document.querySelector(".number.decimal");
decimalButton.addEventListener('click', (event) => event.target.disabled = true);
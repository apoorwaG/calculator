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

    if(b === 0) {
        const a = "Quite impossible!";
        const b = "Not going to do that.";
        const c = "Try doing that yourself!";
        const choices = [a, b, c];
        let choice = Math.floor(Math.random() * 3);
        switch(choice){
            case 0:
                return choices[0];
            case 1:
                return choices[1];
            default:
                return choices[2];

        }

    } 
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
    allButtons.forEach(button => {
        button.disabled = false;
    });
}

function toggleDecimalButton() {
    decimalButton.disabled = false;
}

function deleteKey(event) {
    if(expression.operandB) {
        // user is currently enetering the second operand
        display.textContent = display.textContent.slice(0, -1);
        if(expression.operandB.length >= 1){
            expression.operandB = expression.operandB.slice(0, -1);
        }
    } else if(expression.operator && !expression.operandB){
        display.textContent = display.textContent.slice(0, -3);
        expression.operator = "";
    } else if(expression.operandA && !expression.operator){
        display.textContent = display.textContent.slice(0, -1);
        if(expression.operandA.length >= 1){
            expression.operandA = expression.operandA.slice(0, -1);
            if(expression.operandA === "-"){
                // if after deleting a key, only the negative remains
                expression.operandA = "";
                display.textContent = "";
            }
        }
    } else {
        console.log("Nothing to delete!");
    }
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


function executeOperation(event){
    // both operands set. execute operation and update display
    console.log(`Operator: ${expression.operator}, ${expression.operandA}, ${expression.operandB}`);
    const result = operate(expression.operator, +expression.operandA, +expression.operandB);

    if(typeof result !== "number"){
        // math error
        display.textContent = result;
        allButtons.forEach(button => {
            button.disabled = true;
        });
        clearButton.disabled = false;
        return;
    }

    console.log(result.toPrecision(8));

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

function buildExpression(event) {
    if(!expression.operandA || (expression.operator && !expression.operandB)) {
        console.log("adieu");
        return;
    }
    if(!expression.operandB){
        // still building the expression. update the operator  and the display
        if(event.target.textContent !== "="){
            expression.operator = event.target.textContent;
            display.textContent += ` ${expression.operator} `;
            toggleDecimalButton();
        }
        return;
    }
    // at this stage, we have both operands and an operator
    toggleDecimalButton();

    executeOperation(event);
}

const numberButtons = document.querySelectorAll("button.number");
numberButtons.forEach((button) => {
    button.addEventListener('click', setOperand);
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
    button.addEventListener('click', buildExpression);
});

const clearButton = document.querySelector("button.clear");
clearButton.addEventListener('click', clearDisplay);

const decimalButton = document.querySelector(".number.decimal");
decimalButton.addEventListener('click', (event) => event.target.disabled = true);

const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener('click', deleteKey);

const allButtons = document.querySelectorAll("button");


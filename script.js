const buttons=document.querySelectorAll('.btn');

const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operation = null;

buttons.forEach(button =>{
    button.addEventListener('click',btnClick);
})

const clear=document.getElementById('clear');
clear.addEventListener('click',cleardisplay);

function updateDisplay(value) {
    display.textContent = value;
}

function cleardisplay(){
    display.textContent = 0;
    currentInput = '';
    previousInput = '';
    operation=null;
}


function appendnumber(num){
    if (currentInput !== undefined) {
        if (currentInput.includes('.') && num === '.') return;
        currentInput = currentInput.toString() + num.toString();
      }
      updateDisplay(currentInput);
}

function chooseOp(op){
    if (currentInput==='') return;
    if (previousInput!==''){
        compute()
    }
    operation=op;
    previousInput=currentInput;
    currentInput='';
}

function compute(){
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(curr) || isNaN(prev)) return;
    switch(operation){
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default :
            return;
    }

    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateDisplay(currentInput);
}

function btnClick(event) {
    const value = event.target.dataset.value;
    if (!isNaN(value) || value === '.') {
        appendnumber(value);
    } else if (value === 'C') {
        cleardisplay();
    } else if (value === '=') {
        compute();
    } else {
        chooseOp(value);
    }
    playClickSound();
}

function playClickSound() {
    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0; // Reset the sound to start
    clickSound.play();
}   

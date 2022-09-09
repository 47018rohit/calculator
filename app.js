// Display screen
const displayScreen = document.querySelector('#screen')
const inputScreen = document.querySelector('.input')
const previousOperand = document.querySelector('.previous')
const currentOperand = document.querySelector('.current')
const resultScreen = document.querySelector('.result')

// Keypad Buttons 
const keypad = document.querySelector('.keypad')
const keyContainer = document.createElement('div')
keypad.append(keyContainer)
keyContainer.classList.add('keycontainer')
keyContainer.style.gridTemplateColumns = 'repeat(4 , 1fr)';
let pressed;
let current = ''; let previous = ''; let lastOperator = ''; 
let result = null ; let haveDot = false; 

const keys = ['AC','CE','%','÷','7','8','9','×','4','5','6','-','1','2','3','+','','0','.','=']
keys.forEach(key=>{
    const button = document.createElement('button')
    button.innerHTML = key
    if(button.innerHTML == 'AC'){
            button.classList.add('all-clear');
        }else if(button.innerHTML == 'CE'){
            button.classList.add('clear-entity')
        }else if(button.innerHTML == '='){
            button.classList.add('equal-to');
        }else if(Number(button.innerHTML) || button.innerHTML == '.' || button.innerHTML == '0'){
            button.classList.add('number-key');
        }else{
            button.classList.add('operator-key');
        }
    keyContainer.insertAdjacentElement("beforeend", button);
   
});

const allClear = document.querySelector('.all-clear')
const clearEntity = document.querySelector('.clear-entity')
const equalTo = document.querySelector('.equal-to')
const operatorKey = document.querySelectorAll('.operator-key')
const numberKey = document.querySelectorAll('.number-key')
 
numberKey.forEach(number =>{
    number.addEventListener('click' , (e)=>{
        if(e.target.innerHTML ==='.' && !haveDot){
            haveDot = true;
        }else if(e.target.innerHTML === '.' && haveDot){
            return;
        }
        current += e.target.innerHTML;
        currentOperand.innerText = current;
        
    })
});

operatorKey.forEach(opkey =>{
    opkey.addEventListener('click' , (e)=>{
        if(!current) return;
        haveDot = false;
        const operator = e.target.innerHTML;
        if(current && previous && lastOperator){
            operate();
        }else{
            result = parseFloat(current);
        }
        clearVar(operator);
        lastOperator = operator;
    })
})

function clearVar(name = ''){
    previous += current+ ' ' + name+ ' ';
    previousOperand.innerText = previous;
    currentOperand.innerText = '';
    current = '';
    resultScreen.innerText = result;
}

function operate(){
     switch(lastOperator){
            
            case '%': result = parseFloat(result) % parseFloat(current);
            break
            case '÷':if(current === '0'){
                    result = '×o× '
                    }
                    else{
                    result = parseFloat(result) / parseFloat(current);
                    result = result.toFixed(4)
                    }
            break
            case '×':result = parseFloat(result) * parseFloat(current),
                     result = result.toFixed(4);
            break
            case '-':result = parseFloat(result) - parseFloat(current),
                    result = result.toFixed(4);
            break
            case '+':result = parseFloat(result) + parseFloat(current),
                    result = result.toFixed(4);
            break
        }
}
  
allClear.addEventListener('click' , ()=>{
    previous = previousOperand.innerText = '';
    current = currentOperand.innerText = '';
    result = resultScreen.innerText = '';
    operator = lastOperator = '';
})

clearEntity.addEventListener('click' , ()=>{
    currentOperand.innerText = '';
    current = '';
})
        
equalTo.addEventListener('click' , ()=>{
    if(!current || !previous) return;
        haveDot = false;
        operate();
        clearVar();
        previous = previousOperand.innerText ='';
        currentOperand.innerText = result;
        resultScreen.innerText = '';
        result = '';
    
    
})
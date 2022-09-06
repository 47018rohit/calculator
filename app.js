// Display screen
const displayScreen = document.querySelector('#screen')
const inputScreen = document.querySelector('.input')
const previousOperand = document.querySelector('.previous')
const currentOperand = document.querySelector('.current')
const answerScreen = document.querySelector('.answer')

let current; let previous;
let finalDis; 


// Keypad Buttons 
const keypad = document.querySelector('.keypad')
const keyContainer = document.createElement('div')

keypad.append(keyContainer)
keyContainer.classList.add('keycontainer')
keyContainer.style.gridTemplateColumns = 'repeat(4 , 1fr)';
let button;let pressed;
const keys = ['AC','⌫','%','÷','7','8','9','×','4','5','6','-','1','2','3','+','','0','.','=']
keys.forEach(key=>{
    button = document.createElement('button')
    button.innerHTML = key
    keyContainer.insertAdjacentElement("beforeend", button)
    button.addEventListener('click', (e)=>{
        pressed = e.target.innerHTML;

        if(isNaN(pressed) && pressed != '.'){
            
            if(pressed == '÷' || pressed == '-' || pressed == '+' || pressed == '×'){
                previousOperand.innerText = currentOperand.innerText,
                previous = previousOperand.innerText;
                currentOperand.innerHTML = '';
            }
            operate();
        }else{
            currentOperand.innerText += pressed;
            current = currentOperand.innerHTML;
        }
        
    }); 
})

function operate(){
    switch(pressed){
        case 'AC': currentOperand.innerHTML = ''
                 ,  answerScreen.innerText = '' 
                 , previousOperand.innerHTML='' ;
        break
        case '%': answerScreen.innerText = current/100;
        break
        case '×':
              answerScreen.innerText = `${previous} * ${current} `;
              finalDis = answerScreen.innerText;
        break
        case '=':
            
    }
}
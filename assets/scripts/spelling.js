import { requestPokemon } from './app.js';
import { sleep } from './utilities/sleep.js';

const userAttempt = document.querySelector('.userAttempt');


export function checkSpellingIsCorrect(name, userInput) {  
        userInput =  userInput.trim();
        if ( userInput == name) {
            correct();
        } else {
            incorrect(userInput, name); 
        }
    
}

const correct = () => {
    console.log('correct')
    userAttempt.textContent = '';
    document.querySelector('body').style.background = 'green';
    document.querySelectorAll('input').forEach(elem => {
        elem.value = '';  
        document.querySelector('.main-img').style.opacity = '0';
    });
    sleep(1000)
    .then(() => {
        
        document.querySelector('body').style.background = '#181b1d';
        requestPokemon();
    })
}


const incorrect = (userInput, name) => {
    
    userInput = userInput.split("");
    userInput = userInput.slice(0, name.length)
    name = name.split("");

    for (let i = 0; i < name.length; i++) {
        if (userInput[i] === name[i]) {
            userInput[i] = userInput[i];
        } else {
            userInput.splice(i, 1, "_");
        }
    }
    
    userAttempt.textContent = userInput.join("");
    userAttempt.style.opacity = '1';

    document.querySelector('.input-container').firstElementChild.focus();
}
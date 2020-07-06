import { requestPokemon } from './app.js';
import { sleep } from './utilities/sleep.js';
import { ranNum } from './utilities/ranNum.js'

const userAttempt = document.querySelector('.userAttempt');
const audio = document.querySelector('.loadMusic');

export function checkSpellingIsCorrect(name, userInput) {  
        userInput =  userInput.trim();
        if ( userInput == name) {
            correct();
        } else {
            incorrect(userInput, name); 
        }
    
}

const correct = () => {

    const celebration = ranNum(4);
    audio.src = `./assets/audio/correct/c${celebration}.mp3`;
    audio.play()

    userAttempt.textContent = '';
    document.querySelector('body').style.background = 'green';
    document.querySelectorAll('input').forEach(elem => {
        elem.value = '';  
        document.querySelector('.main-img').style.opacity = '0';
    });
    
    sleep(1500)
    .then(() => { 
        document.querySelector('body').style.background = '#181b1d';
        requestPokemon();
    })
}


const incorrect = (userInput, name) => {
    

    audio.src = './assets/audio/incorrect/incorrect.mp3';
    audio.play()
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
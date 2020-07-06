import { checkSpellingIsCorrect } from './spelling.js';
import { speak } from './speak.js';
import { sleep } from './utilities/sleep.js';
import { sort } from './utilities/sort.js';
import { ranNum } from './utilities/ranNum.js';
import { playAudio } from './play.js';



const btn = document.querySelector('.main-btn');
const pokeName = document.querySelector('.name'); 
const pokeImage = document.querySelector('.main-img');
const inputField = document.querySelector('.user-input');
const sayNameBtn = document.querySelector('.icon');
const intro = document.querySelector('.intro-container')
const display = document.querySelector('.secondary-container');
const settings = document.querySelectorAll('.setting button');

let sortedData = '';
let data = '';
let level = 4;


//load all pokemon on start of game
async function loadPokemon() {
    try {
        data = await fetchPokemonData();
        sortedData = sort(data.results, level);
        console.log('Caught pokemon...')
    } catch (err) {
        console.log(err);
    }
   
}


// request pokemon called at start and after correct spelling
 export async function requestPokemon() {
    await fetchPokemon();
    sleep(500).then(() => {
        intro.style.visibility = 'hidden';
        display.style.visibility = 'visible';
        display.style.opacity = 1;
        pokeImage.style.opacity = 1;
        document.querySelector('.user-input').focus();
    })
    
    
}



// fetch randomly generated pokemon based on name length from api taken from sortedData array
async function fetchPokemon() {
    try {
        pokeImage.style.width = '64px';
        pokeImage.src = '../../pokeball.svg';  
        const randomPokemon = ranNum(sortedData.length);
        const pokemon = sortedData[randomPokemon];
        sortedData = sortedData.filter(item => item !== pokemon);
        const pokemonID =  await fetch(pokemon.url).then(data => {return data.json()})
        await loadImage(`https://pokeres.bastionbot.org/images/pokemon/${pokemonID.id}.png`)
        const name = pokemon.name;    
        pokeName.innerText = name;
        speak(name);
    } catch (err) {
        console.log(err);
        if (sortedData.length === 0) {alert('You have completed the level'); return}
        fetchPokemon();
    }
  

}


window.onload = () => {
    
}
// dynamically load images 
function loadImage(url) {
    let newImage = new Image();
    newImage.onload = function() {
        pokeImage.src = this.src
        pokeImage.style.width = '100%';
    }
    newImage.src = url
}

// fetch pokemon data from api 
function fetchPokemonData(pokemon) {
    return new Promise(resolve => {
        console.log('hunting for pokemon...'); 
        resolve(
            fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=700`)
            .then(data => {return data.json()})
            .catch(err => {alert('Invalid entry - please try again'); console.log(err)})
        )
    })
}

// event listeners 
btn.addEventListener('click', () => {
    requestPokemon();  
});
settings.forEach(elem => {
    elem.addEventListener('click', (e) => {
        playAudio();
        settings.forEach(item => {
            item.classList.remove('toggle');
        })
        level = e.target.dataset.level;
        loadPokemon();
       e.target.classList.toggle('toggle');

})
})


sayNameBtn.addEventListener('click',() =>  {
    speak(pokeName.innerText);
    document.querySelector('.user-input').focus();
})
inputField.addEventListener('keydown', (e) => {
    if  (e.key === 'Enter') {
        checkSpellingIsCorrect(pokeName.innerText, inputField.value);
    }
})


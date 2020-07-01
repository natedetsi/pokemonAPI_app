import { checkSpellingIsCorrect } from './spelling.js';
import { speak } from './speak.js';
import { sleep } from './utilities/sleep.js';
import { sort } from './utilities/sort.js';
import { ranNum } from './utilities/ranNum.js';



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
        const randomPokemon = ranNum(sortedData.length);
        console.log(randomPokemon)
        const pokemon = sortedData[randomPokemon];
        sortedData = sortedData.filter(item => item !== pokemon);
        const pokemonID =  await fetch(pokemon.url).then(data => {return data.json()})
        const imageSRC = `https://pokeres.bastionbot.org/images/pokemon/${pokemonID.id}.png`;
        pokeImage.src = imageSRC;
        const name = pokemon.name;    
        pokeName.innerText = name;
        speak(name);
    } catch (err) {
        console.log(err);
        if (sortedData.length === 0) {alert('You have completed the level'); return}
        fetchPokemon();
    }
  

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
        settings.forEach(item => {
            item.classList.remove('toggle');
        })
        level = e.target.dataset.level;
        console.log(level)
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


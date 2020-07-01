
const synth = window.speechSynthesis;
let voices = [];
    

export const speak = (name) => {
    const sayName = new SpeechSynthesisUtterance(name);

    if (synth.speaking) {
            console.log("Error - already speaking, please wait...")
            return;
    }

    sayName.voice = voices[2]
    sayName.rate = 0.75;
    sayName.pitch = -1;

    synth.speak(sayName);     
        
    }
    

function getVoices() {
     voices = synth.getVoices();
    return voices;
}    

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}    



export function playAudio() {
       
    const sound = document.querySelector('.loadMusic');        
    sound.play()
    sound.onended = () => {sound.src = ''}
    
}
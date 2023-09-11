import { words } from './words.js'
import { convertNumberToWords } from './intToWord.js'
import { playerDelete } from './playerDelete.js'
export { classCounter }
let input
let letters
let timer
let score
let inputContainer
let previousWord = ''
let currentWord = ''
let index = []
let time = 10
let point = 0
let timing
let success = false
let classCounter = 0
let multiplayer = false

document.body.addEventListener('click', e => {
    if (e.target.classList == 'multiplayer-btn') {
        document.body.innerHTML = `
        <div class="multiplayer-container">
            <div class="multiplayer-card">
                <h1>Add Players</h1>
                <div class="name-container"></div>
                <div class="input-field">
                    <input class="player-value" type="text" placeholder="Enter name">
                    <button class="add">
                        <span id="person-add" class="material-symbols-outlined">person_add</span>
                    </button>
                </div>
                <h1 class="round-text">Rounds: 3</h1>
                <form>
                    <input type="range" id="round-selector" name="round-selector" min="1" max="5" step="2" value="3"/>
                </form>
                <button class="multiplayer-play-btn">PLAY</button>
            </div>
        </div>
        `
        multiplayer = true
    }
    if (multiplayer) {
        const roundText = document.querySelector('.round-text')
        const roundSelector = document.querySelector('#round-selector')
        roundSelector.oninput = function() {
            roundText.textContent = `Rounds: ${roundSelector.value}`
        }
    }
})

document.body.addEventListener('click', e => {
    if ((e.target.classList.contains('add') || e.target.id == 'person-add') && (classCounter < 5)) {
        classCounter += 1
        document.querySelector('.name-container').innerHTML += `
        <div class="player-names ${convertNumberToWords(classCounter)}">
            <h1 class="player-name">${document.querySelector('.player-value').value}</h1>
            <i class="material-symbols-outlined player-delete ${convertNumberToWords(classCounter)}">close</i>
        </div>
        `
    }
    if (e.target.classList.contains('player-delete')) {
        classCounter -= 1
        playerDelete(e.target, e.target.parentElement)
    }
})

document.body.addEventListener('click', e => {
    if (e.target.classList == 'solo-btn') {
        document.body.innerHTML = `        
            <div class="container">
                <div class="time-container">
                    <h1 class="time">10</h1>
                </div>
                <div class="word-container">
                    <h1 class="word"></h1>
                    <h1 class="word"></h1>
                    <h1 class="word"></h1>
                    <h1 class="word"></h1>
                    <h1 class="word""></h1>
                </div>
                <div class="input-container">
                    <input type="text" placeholder="Enter word">
                </div>
            </div>
            <h1 class="score">Score: 0</h1>
        `
        input = document.querySelector('input')
        letters = document.querySelectorAll('.word')
        timer = document.querySelector('.time')
        score = document.querySelector('.score')
        inputContainer = document.querySelector('.input-container')
        selectRandomWord()
    }
})


function countDown() {
    if (success) {
        clearInterval(timing)
        success = false;
        time = 10
        index = []
        setTimeout(() => {
            letters.forEach(letter => {
                letter.classList.remove('bg-green')
            })
            selectRandomWord()
        }, 1000)
    }
    timer.innerHTML = time
    time -= 1
    if (time == -1) {
        let i = 0
        clearInterval(timing)
        while (i < 5) {
            letters.forEach(letter => {
                letter.textContent = currentWord[i].toUpperCase()
                letter.classList.add('bg-green')
                i++
            })
        }
        inputContainer.innerHTML = '<button>Try Again</button>'
        const button = document.querySelector('button')
        button.addEventListener('click', e => {
            time = 10
            inputContainer.innerHTML = '<input type="text" placeholder="Enter word">'
            index = []
            letters.forEach(letter => letter.classList.remove('bg-green'))
            point = 0
            score.textContent = `Score: ${point}`
            selectRandomWord()
        })    
    }
}


function selectRandomWord() {
    currentWord = words[Math.floor(Math.random() * 488)]
    if (currentWord === previousWord) {
        selectRandomWord()
    }
    previousWord = currentWord
    index.push(Math.floor(Math.random() * 5))
    const scrambler = () => {
        if (index.length == 5) {
            return
        } else {
            let num = Math.floor(Math.random() * 5)
            if (index.includes(num)) {
                scrambler()
            } else {
                index.push(num)
                scrambler()
            }
        }
    }
    timing = setInterval(countDown, 1000)
    scrambler()
    changeText()
}


document.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        checkWord()
    }
})


function changeText() {
    let i = 0
    while (i < 5) {
        letters.forEach(letter => {
            letter.textContent = currentWord[index[i]].toUpperCase()
            if (letter.textContent === currentWord[i].toUpperCase()) {
                letter.classList.add('bg-green')
            } 
            i++
        })
    }
}


function checkWord() {
    input = document.querySelector('input') 
    if (input.value.toLowerCase() === currentWord.toLowerCase()) {
        point += 1
        score.textContent = `Score: ${point}`
        let i = 0
        while (i < 5) {
            letters.forEach(letter => {
                letter.textContent = currentWord[i].toUpperCase()
                letter.classList.add('bg-green')
                i++
            })
        }
        input.value = ''
        success = true
    } else {
        letters.forEach(letter => {
            if (!letter.classList.contains('bg-green')) {
                letter.classList.add('bg-red')
                setTimeout(() => {
                    letter.classList.remove('bg-red')
                }, 1000);
            }
        })
    }
}


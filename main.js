import { words } from './words.js'
const playBtn = document.querySelector('.play-btn')
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


playBtn.addEventListener('click', e => {
    document.body.innerHTML = `        
    <div class="container">
        <div class="time-container">
            <h1 class="time">10</h1>
        </div>
        <div class="word-container">
            <h1 class="word" id="one"></h1>
            <h1 class="word" id="two"></h1>
            <h1 class="word" id="three"></h1>
            <h1 class="word" id="four"></h1>
            <h1 class="word" id="five"></h1>
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


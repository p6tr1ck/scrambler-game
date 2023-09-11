export { playerDelete }
import { convertNumberToWords } from "./intToWord.js"
import { classCounter  } from "./multiplayer.js"

function playerDelete(p, pe) {
    let j = document.querySelectorAll('.player-names')
    j.forEach(player => {
        player.classList.remove(player.classList[1])
        let i = 0
        while (i < classCounter) {
            player.classList.add(convertNumberToWords(i))
        }
        i += 1
        console.log(player.classList)
    })
}
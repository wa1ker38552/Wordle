function clearBorders(guess) {
  for (children of guessesContainer.children[guess].children) {
    children.style.borderColor = ""
  }
}

function revealSolution() {
  var container = document.getElementsByClassName("reveal-container")[0]
  if (container.style.display == "none") {
    container.style.display = ""
    document.getElementById("revealGuess").innerHTML = secretWord.toUpperCase()
  } else {
    container.style.display = "none"
  }
}

function setGuess(g, cg, value, set) {
  clearBorders(g)
  guessesContainer.children[g].children[cg].innerHTML = value
  if (cg <= 3 && set == true) {
    guessesContainer.children[g].children[cg+1].style.borderColor = "#ffffff"
  } else {
    guessesContainer.children[g].children[cg].style.borderColor = "#ffffff"
  }
}

function getWord(guess) {
  var s = ""
  for (e of guessesContainer.children[guess].children) {
    s += e.innerHTML
  }
  return s.toLowerCase()
}

function highlightGuess(guess) {
  var i = 0
  for (char of guessesContainer.children[guess].children) {
    if (char.innerHTML.toLowerCase() == secretWord[i]) {
      char.style.background = "#0fdb00"
    } else if (secretWord.includes(char.innerHTML.toLowerCase())) {
      char.style.background = "#ffcb70"
    } else {
      char.style.background = "#b0b0b0"
    }
    i += 1
  }
}

var guess = 0
var currentGuessKey = -1
var guessesContainer
var secretWord
var win = false
var guessed = []
window.onload = function() {
  secretWord = secretWords[Math.floor(Math.random()*secretWords.length)]
  guessesContainer = document.getElementById("guessesContainer")
  
  document.addEventListener("keydown", function(e) {
    if (!win) {
      if (e.key == 'Enter') {
        if (getWord(guess).length == 5) {
          if (words.includes(getWord(guess)) && !guessed.includes(getWord(guess))) {
            highlightGuess(guess)
            clearBorders(guess)
            if (getWord(guess) == secretWord) {
              win = true
            } else {
              if (guess == 5) {
                win = true
              } else {
                guessed.push(getWord(guess))
                guess += 1
                guessesContainer.children[guess].children[0].style.borderColor = "#ffffff"
                currentGuessKey = -1
              }
            }
          } else {
            for (child of guessesContainer.children[guess].children) {
              child.style.borderColor = "#ff7a7a"
            }
          }
        } else {
          for (child of guessesContainer.children[guess].children) {
            if (child.innerHTML == "") {
              child.style.borderColor = "#ff7a7a"
            }
          }
        }
      }
      else if (e.key == 'Backspace') {
        if (currentGuessKey >= 0) {
          if (currentGuessKey == 4) {
            setGuess(guess, 4, "", false)
          } else {
            setGuess(guess, currentGuessKey, "", false)
          }
          currentGuessKey -= 1
        }
      }
      else if ('abcdefghijklmnopqrstuvwxyz'.includes(e.key)) {
        if (currentGuessKey <= 3) {currentGuessKey += 1}
        setGuess(guess, currentGuessKey, e.key.toUpperCase(), true)
      }
    }
  })
}

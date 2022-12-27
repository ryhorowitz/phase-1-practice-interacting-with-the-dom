// See the timer increment every second once the page has loaded.
const body = document.querySelector('body')
const counter = document.querySelector('#counter')
const minusBtn = document.querySelector('#minus')
const plusBtn = document.querySelector('#plus')
const heartBtn = document.querySelector('#heart')
const pauseBtn = document.querySelector('#pause')
const likesList = document.querySelector('.likes')
const likeObj = {}
let number = Number(counter.textContent)
let isPaused = false;



function incrementCounter() {
  number++
  counter.textContent = number.toString()
}

document.addEventListener('DOMContentLoaded', () => {
  let interval = setInterval(incrementCounter, 1000)

  // Manually increment and decrement the counter using the plus and minus buttons.
  minusBtn.addEventListener('click', () => {
    if (!isPaused) {
      number--
      counter.textContent = number.toString()
    }
  })
  plusBtn.addEventListener('click', () => {
    if (!isPaused) {
      number++
      counter.textContent = number.toString()
    }
  })

  // Pause the counter, which should:
  // pause the counter
  // disable all buttons except the pause button
  // switch the label on the button from "pause" to "resume"
  function pause() {
    isPaused = !isPaused
    if (!isPaused) {
      interval = setInterval(incrementCounter, 1000)
      pauseBtn.textContent = ' pause '
      minusBtn.disabled = false
      plusBtn.disabled = false
      heartBtn.disabled = false
    } else {
      clearInterval(interval)
      pauseBtn.textContent = ' resume '
      minusBtn.disabled = true
      plusBtn.disabled = true
      heartBtn.disabled = true
    }
  }
  pauseBtn.addEventListener('click', pause)

  heartBtn.addEventListener('click', () => {

    if (likeObj[number]) {
      likeObj[number]++

      let updateLi = document.querySelector('[data-num="' + number + '"]')
      updateLi.textContent = `${number} has been liked ${likeObj[number]} times`
      likesList.appendChild(updateLi)
    } else {
      let li = document.createElement('li')
      li.setAttribute("data-num", number.toString())
      likeObj[number] = 1
      // '2 has been liked 1 time'
      li.textContent = `${number} has been liked 1 time`
      likesList.appendChild(li)
    }
  })

  const restartBtn = document.createElement('button')
  restartBtn.id = 'restart'
  restartBtn.textContent = 'restart'
  body.append(restartBtn)
  // Click the "restart" button to restart the counter and re-enable the buttons.
  function resetCounter() {
    //clearInterval
    counter.textContent = '0'
    number = Number(counter.textContent)
    isPaused = false
    clearInterval(interval)
    interval = setInterval(incrementCounter, 1000)
    pauseBtn.textContent = ' pause '
    minusBtn.disabled = false
    plusBtn.disabled = false
    heartBtn.disabled = false
  }
  restartBtn.addEventListener('click', resetCounter)
})

// Leave comments on my gameplay, such as: "Wow, what a fun game this is."
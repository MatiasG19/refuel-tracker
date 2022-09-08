const duration = 5000
const frameTime = 50
const frames = duration / frameTime

function countAnimation(el) {
  const countTo = 100000
  const oldValue = +el.innerHTML
  const diff = countTo - oldValue
  el.innerHTML = oldValue
  const step = diff / (duration / frameTime)
  let frame = 0

  const i = timer(el, step, frame)
}

const runAnimations = () => {
  const countupEls = document.querySelectorAll('.countup')
  countupEls.forEach(countAnimation)
}

function timer(el, step, frame) {
  frame++
  setTimeout(() => {
    el.innerHTML = +el.innerHTML + step

    if (frame < frames) timer(el, step, frame)
    else setTimeout(() => (el.innerHTML = 10000), frameTime)
  }, frameTime)
}

// diff * easeOutQuad(frame / frames)
const easeOutQuad = (t: number) => t * (2 - t)

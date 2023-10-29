let circle = true, finished = false, cnt = 0, stillProcess = false
const turn = document.getElementById("turn")
const reset = document.getElementById("reset")

const arr = [
  [],
  [null, document.getElementById("1-1"), document.getElementById("1-2"), document.getElementById("1-3")],
  [null, document.getElementById("2-1"), document.getElementById("2-2"), document.getElementById("2-3")],
  [null, document.getElementById("3-1"), document.getElementById("3-2"), document.getElementById("3-3")]
]

const p = [
  [],
  [null, document.getElementById("i-1-1"), document.getElementById("i-1-2"), document.getElementById("i-1-3")],
  [null, document.getElementById("i-2-1"), document.getElementById("i-2-2"), document.getElementById("i-2-3")],
  [null, document.getElementById("i-3-1"), document.getElementById("i-3-2"), document.getElementById("i-3-3")]
]

reset.addEventListener("click", () => {

  cnt = 0
  circle = true
  finished = false
  stillProcess = false
  turn.innerText = "Circle's turn"

  for(let i = 1; i <= 3; ++i) {
    for(let j = 1; j <= 3; ++j) {
      p[i][j].innerText = ""
    }
  }
})

const change = () => {
  stillProcess = true
  if(circle) {
    turn.innerText = "Circle's turn"
  }
  else {
    turn.innerText = "Cross' turn"
  }
  stillProcess = false
}

const win = (who) => {
  finished = true // tidak bisa gerak lagi

  if(who === "T") {
    turn.innerText = "Tie !!!"
  }
  else if(who === "O") {
    turn.innerText = "Circle has won !!!"
  }
  else {
    turn.innerText = "Cross has won !!!"
  }

}

const check = () => {
  stillProcess = true

  // baris
  for(let i = 1; i <= 3; ++i) {
    if((p[i][1].innerText === "O" || p[i][1].innerText === "X") && 
    p[i][1].innerText === p[i][2].innerText && 
    p[i][1].innerText === p[i][3].innerText) {
      win(p[i][1].innerText)
      return
    }
  }
  
  // kolom
  for(let j = 1; j <= 3; ++j) {
    if((p[1][j].innerText === "O" || p[1][j].innerText === "X") && 
    p[1][j].innerText === p[2][j].innerText && 
    p[1][j].innerText === p[3][j].innerText) {
      win(p[1][j].innerText)
      return
    }
  }
  
  // diagonal utama
  if((p[1][1].innerText === "O" || p[1][1].innerText === "X") && 
  p[1][1].innerText === p[2][2].innerText && 
  p[1][1].innerText === p[3][3].innerText) {
    win(p[1][1].innerText)
    return
  }

  // diagonal samping
  if((p[1][3].innerText === "O" || p[1][3].innerText === "X") && 
  p[1][3].innerText === p[2][2].innerText && 
  p[1][3].innerText === p[3][1].innerText) {
    win(p[1][3].innerText)
    return
  }

  if(cnt === 9)
    win("T")

  stillProcess = false
}

for(let i = 1; i <= 3; ++i) {
  for(let j = 1; j <= 3; ++j) {

    arr[i][j].addEventListener("click", () => {

      if(p[i][j].innerText === "O" || p[i][j].innerText === "X" || finished || stillProcess) {
        return
      }

      if(circle) {
        p[i][j].innerText = "O"
      }
      else {
        p[i][j].innerText = "X"
      }
      
      circle = !circle
      change()
      
      ++cnt
      check()

    })

  }
}

//const { message } = require('koa/lib/response.js')

//IIFE implementation을 숨겨야할 경우
;(() => {
  const socket = new WebSocket(`ws://${window.location.host}/ws`)
  const formEl = document.getElementById('form')
  const inputEl = document.getElementById('input')
  const chatsEl = document.getElementById('chats')

  if (!formEl || !inputEl || !chatsEl) {
    throw new Error('Init failed!')
  }

  const chats = []

  formEl.addEventListener('submit', (event) => {
    event.preventDefault() //페이지 리프레쉬 없이 가능
    socket.send(
      JSON.stringify({
        nickname: 'nickname',
        message: inputEl.value,
      })
    )
    inputEl.value = ''
  })

  // socket.addEventListener('open', () => {
  //   socket.send('hello. websocket')
  // })

  socket.addEventListener('message', (event) => {
    chats.push(JSON.parse(event.data))
    chatsEl.innerHTML = ''
    chats.forEach(({ nickname, message }) => {
      const div = document.createElement('div')
      div.innerText = `${nickname}: ${message}`
      chatsEl.appendChild(div)
    })
  })
})()

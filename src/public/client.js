//IIFE implementation을 숨겨야할 경우
;(() => {
  const socket = new WebSocket(`ws//${window.location.host}/ws`)
  const formEl = document.getElementById('form')
  const inputEl = document.getElementById('input')

  if (!formEl | !inputEl) {
    throw new Error('Init failed!')
  }

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

  socket.addEventListener('open', () => {
    socket.send('hello. websocket')
  })

  socket.addEventListener('message', (event) => {
    alert(event.data)
  })
})()

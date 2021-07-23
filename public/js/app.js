
const Form = document.querySelector('form')
const input = document.querySelector('input')
const msg1 = document.getElementById('msg1')
const msg2 = document.getElementById('msg2')


Form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = input.value
    msg1.textContent = 'Fetching Weather...'
    msg2.textContent = ''
    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg2.textContent = data.error
            } else {
                msg1.textContent = data.Place
                msg2.textContent = data.forecast
                console.log(data.forecast)

            }
        })
    })


})
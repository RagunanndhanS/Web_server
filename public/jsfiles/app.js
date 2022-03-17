
// fetch('http://puzzle.mead.io/puzzle').then(
//     (response) => {
//         response.json().then((data) => {
//             console.log(data)

//         })
//     }
// )


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const datamsg = document.querySelector('#Datamsg')
const errormsg = document.querySelector('#Errormsg')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    datamsg.textContent = 'Loading...'
    errormsg.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error)
                    errormsg.textContent = data.error
                    datamsg.textContent=''

                } else {
                    datamsg.innerHTML = 'Location : ' + data.location + '<br><br>' + 'Forecast : '  +data.forecast
                    console.log(data.location)
                    console.log(data.forecast)
                }
            })
        }
    )
})
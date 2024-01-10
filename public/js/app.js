
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    messageOne.textContent = "loading..."
    messageTwo.textContent = ""

    fetch(`http://localhost:3000/weather?address=${search.value}`).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = ""
            messageTwo.textContent = data.error
            
        } else
        messageOne.textContent = data.forcast
    } )
}).catch((err)=> {
    messageOne.textContent = ""
    messageTwo.textContent = err.error
})
})
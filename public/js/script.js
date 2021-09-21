
const address = document.querySelector('.location')
const messageOne=document.getElementById('message-1')
const messageTwo=document.getElementById('message-2')
const result=document.querySelector('.result')

//function to fetch data from weather end point
const fetchData=function(){
messageOne.textContent='loading . . .'
  messageTwo.textContent=''
  if(document.querySelector('.icon')){
    result.removeChild(document.querySelector('.icon'))
  }

  fetch(`http://localhost:3000/weather?address=${address.value}`).then((response)=>{
    response.json().then((data)=>{
      if(data.error){
        messageOne.textContent=data.error
        messageTwo.textContent=''
      }
      else{
        messageOne.textContent=data.location
        messageTwo.textContent=data.forecast
        result.insertAdjacentHTML('beforeend',`<img class="icon" src=${data.logo}>`)
      }
    })
  })
  address.value=''

}

//activates after clicking button
document.querySelector('.search').addEventListener('click',()=>{
  fetchData()
})

//activates after clicking enter
document.addEventListener('keydown',(e)=>{
   if(e.key==='Enter'){
      fetchData()  
   }
})

const append='>>>'
const terminalInput=document.querySelector('.terminalInput')
const terminal=document.querySelector('.terminal')
const help=document.querySelector('.help')
const home=document.querySelector('.home')

let weatherData;

const def=`<p class="default">This is created for your interection<br>
with weather apicommands aren't that hard <br>
<br>
type your command then press enter<br>
<br>
For interacting-><br>
1. Enter your city ,state or country<br>
2. Enter your query<br>
  ex. temperature ,wind_speed,humidity etc.<br>
<br>
3. after that you can clear the terminal<br>
by Entering clear,it eill remove all the data<br>
and you have to start everything from the start.<br>
<br>
-Enter help for more<br>
-Enter exit for exiting <br>
  </p>`

terminal.insertAdjacentHTML('beforeend',def)

document.addEventListener('keydown',(e)=>{
   if(e.key==='Enter'){
     const input=terminalInput.value;
     terminalInput.value="";
    
     if(document.querySelector('.default'))
       terminal.removeChild(document.querySelector('.default'))
     terminal.insertAdjacentHTML('beforeend',`<p class='textInput'>>>>  ${input}</p>`)
     
     //help input ->redirect to help page
     if(input==='help'||input==='h'){
        help.click()
     } 
     //exit input -> redirect to home page
     else if(input==='exit'||input==='q'){
        home.click()
     }
     //clear the terminal
     else if(input==='clear'){
       let textInput=document.querySelectorAll('.textInput')
       let textReturn=document.querySelectorAll('.textReturn')
       let textError=document.querySelectorAll('.textError')
       if(textInput)
         textInput.forEach(element => {
           element.parentNode.removeChild(element)
         });
       if(textError)
        textError.forEach(element => {
           element.parentNode.removeChild(element)
         });
       if(textReturn)
         textReturn.forEach(element => {
           element.parentNode.removeChild(element)
         });
       weatherData=undefined
     }
     else{
        if(!weatherData){
          fetch(`http://localhost:3000/weather2?address=${input}`).then((response)=>{
            response.json().then((data)=>{
              if(data.error){
                terminal.insertAdjacentHTML('beforeend',`<p class='textError'>>>>  ${data.error}</p>`)
              }
              else{
                weatherData=data
                terminal.insertAdjacentHTML('beforeend',`<p class='textReturn'>>>>  weather data loaded ! you can start your queries now</p>`)
              }
            })
          })
        }
        else{
          if(weatherData.data[input]){
            terminal.insertAdjacentHTML('beforeend',`<p class='textReturn'>>>>  ${weatherData.data[input]}</p>`)
          }
          else{
            terminal.insertAdjacentHTML('beforeend',`<p class='textError'>>>> no property named  ${input} !</p>`)
          }
        }
     }
   }
})

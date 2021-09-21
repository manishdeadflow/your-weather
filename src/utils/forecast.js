const request=require('request')

const forecast=(latitude,longitude,callback)=>{
   const key1='2514c9d7feee820b97246a73d7b32858'
   const key2='dc0b4138293f9e51a5aa484c5794df5a'  

     const url=`http://api.weatherstack.com/current?access_key=${key2}&query=${latitude} ${longitude}&units=m`
        
    request({url:url,json:true},(error,{body}={})=>{
        if(error){
            callback('unable to connect to weather service!',undefined)
        }
        else if(body.error){
            callback('unable to find location',undefined)
        }
        else {
            callback(undefined,{logo:body.current.weather_icons[0],
              forecast:`${body.current.weather_descriptions[0]}.it is currently ${body.current.temperature} degrees.it feels like it is ${body.current.feelslike} degrees out`})
        }
    })
}

module.exports=forecast

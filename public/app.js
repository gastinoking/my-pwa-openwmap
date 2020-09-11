/**
 * //https://mail.google.com/mail/u/0/#inbox/FMfcgxwJXfkGQJCtXKHFTWWpKSlJTLCL
designe
//https://www.behance.net/search?search=weather%20app%20
https://www.behance.net/gallery/98129463/Weather-App?tracking_source=search_projects_recommended%7Cweather%20app%20
https://www.behance.net/gallery/98129463/Weather-App?tracking_source=search_projects_recommended%7Cweather%20app%20



PWA TUTO

https://www.freecodecamp.org/news/build-a-pwa-from-scratch-with-html-css-and-javascript/
https://vaadin.com/learn/tutorials/learn-pwa/turn-website-into-a-pwa?hss_channel=tw-33905417&utm_campaign=Learning%20Center&utm_medium=social&utm_source=twitter&utm_content=92191959
 */
let city = 'Togo'
 


//Bnt Searche
const cityInput = document.getElementById('cityInput')
const btnSerche = document.getElementById('btnSerche')

callApi(city)

btnSerche.addEventListener('click', (e) => {
    e.preventDefault()
    let cityName = (cityInput.value)
    cityInput.value = ''
    if (cityName.length > 1) {
        callApi(cityName)

    } else {
        cityInput.style.border = 'red 1px solid '
    }

})

document.addEventListener('keyup',function(e){
    if(e.code==='Enter'){
        btnSerche.click()
    }
})

async function dataFetch(url, name) {

    try {
        let rep = await fetch(url)
        return await rep.json()
    } catch (err) {
        console.log(err)
    }
}

function dateConvertion(date) {
    let dconvert = ''
    let dateObj = new Date(date * 1000)
    dconvert = dateObj.getHours() + ' h ' + dateObj.getMinutes()
    return dateObj.toLocaleTimeString("en-US")
}


async function callApi(inputCity) {
    //inti Dom 
    const expUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&APPID=ccfde6a08986eb9eb566024d9005c2b1&units=metric`

    const city = document.querySelector('#city')
    const degre = document.querySelector('.degre')
    const imgicon = document.querySelector('#iconeTemps')
    const matin = document.querySelector('#matin')
    const soir = document.querySelector('#soir')
    const alert = document.querySelector('.alert')
     



    try {
        const response = await dataFetch(expUrl)

       // console.log(response)
        city.textContent = response.name
        degre.textContent = Math.round(response.main.temp)

        imgicon.setAttribute('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)
        matin.textContent = dateConvertion(response.sys.sunrise)
        soir.textContent = dateConvertion(response.sys.sunset)
    } catch (error) {
      //  console.log(error)
       alert.classList.remove('hidden')
        window.setTimeout(function(){ 
           alert.classList.add('hidden')
        },5000)
      
    }




}
 

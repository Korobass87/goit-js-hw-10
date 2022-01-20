// import { zip } from 'lodash';
import Notiflix from 'notiflix'
Notiflix.Notify.init({
  
  position: 'center-top',
  distance: '10px',
  opacity: 1,
  // ...
});
import './css/styles.css';
import fetchCountries from './fetchCountries'
const debounce = require('lodash.debounce')
const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box")
const listInput = document.querySelector('.country-list')
const info = document.querySelector('.country-info')
let oneName = ""


// fetch(`https:restcountries.com/v2/name/russia?fields=capital,name,population,flags,languages`)
// .then(x=>x.json())
//     .then(console.log)

input.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY))

function searchCountry() {
    let dataSearch = input.value.trim()
    
    

    if (dataSearch) {
        let data = fetchCountries(dataSearch)
        data
        .then(data => {
                console.log(data)
                if (data.status === 404) {
                    Notiflix.Notify.failure("Oops, there is no country with that name")
                    info.innerHTML = ''
                    listInput.innerHTML = ''
                } else {
                    markup(data)
                }
                
            })
        
            
    } else {listInput.innerHTML = ''
            info.innerHTML = '' }
     
}


function markup(data) {
    
    if (data.length !== 1 && data.length < 11) {
     Notiflix.Notify.success(`Find ${data.length} matches`)   
     let  listMarkup =  data.map(country => `<li class="country-item">
    <img class="flag-name" src="${country.flags.svg}" alt="${country.name.common}">
    ${country.name.official}
    </li>` ).join("")
        
        listInput.innerHTML = ''    
        info.innerHTML = ''
        listInput.insertAdjacentHTML('beforeend', listMarkup)
    } else if ((data.length > 10)) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        info.innerHTML = ''
        listInput.innerHTML = ''
        
    } else {

        let leng = Object.values(data[0].languages).join(', ')
                
        let infoMarkup = data.map(country => `<h2><img class="flag-name" src="${country.flags.svg}" alt="${country.name.common}">${country.name.official}</h2>
        <ul><li class="country-info-item"><span class="wrap">Capital: </span>${country.capital[0]}</li>
        <li class="country-info-item"><span class="wrap">Population: </span>${country.population}</li>
        <li class="country-info-item"><span class="wrap">Languages: </span>${leng}</li>
        </ul>`).join('')
            
            listInput.innerHTML = ''
            info.innerHTML = ''
            info.insertAdjacentHTML('beforeend', infoMarkup)
            }
}
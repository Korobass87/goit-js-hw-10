export default function fetchCountries(name) {
    return (fetch(`https://restcountries.com/v3.1/name/${name}?fields=capital,name,population,flags,languages`)
            .then(d => {
                
                return d.json()

            })
        // .then(data => {
        //         console.log(data)
        //         if (data.status === 404) {
        //             Notiflix.Notify.failure("Oops, there is no country with that name")
        //             info.innerHTML = ''
        //             listInput.innerHTML = ''
        //         } else {
        //             return data
        //         }
                
        //     }
        // )
    )
}
    

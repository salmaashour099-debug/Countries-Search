let searchInput = document.getElementById("countryName");
let countryInfo = document.getElementById("countryInfo");
let searchButton = document.getElementById("search");


//Event 
searchButton.addEventListener("click", searchCountry);

//search 
function searchCountry(){
    let countryName = searchInput.value.trim();
    
    if(!countryName){
        showError('Please Enter the name of the country');
        return;
    }

    countryInfo.innerHTML = `<div class="loading">loading...</div>`;

    fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Country not found");
        }
        return response.json();
    })
    .then(data => {
        displayCountryInfo(data);
    })
    .catch(error => {
        showError(error.message);
    });
}

// display info 
function displayCountryInfo(country){
    countryInfo.innerHTML = `
        <div class="country-card">
            <img src="${country.flags.png}" alt="${country.name.common}" class="country-flag">

            <div class="country-details">
                <h2>${country.name.common}</h2>
                <div class="detail-item"> 
                    <span class="detail-label">Capital:</span> 
                    <span>${country.capital}</span> 
                </div>
                <div class="detail-item"> 
                    <span class="detail-label">Population:</span> 
                    <span>${country.population}</span> 
                </div>
                <div class="detail-item"> 
                    <span class="detail-label">Region:</span> 
                    <span>${country.region}</span> 
                </div>
            </div>
        </div>
    
    `
}

//error
function showError(message){
    countryInfo.innerHTML = `<div class="error-message">${message}</div>`;
}


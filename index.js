'use strict';

const mode = document.querySelector('.mode');
const fa = document.querySelector('.fa');
const head = document.querySelector('.head');
const searchCountry = document.querySelector('.searchCountry');
const body = document.querySelector('.body');
const search = document.querySelector('.search');
const column = document.querySelector('.column');
const btn = document.querySelector('.btn');
const continent = document.querySelector('#continent');

let api = 'https://restcountries.com/v3.1/all';
let toggle = true;
let displaySearch = false;

    const req = new XMLHttpRequest();
    req.open('GET', api)
    req.send();
    
    req.addEventListener('load', function(e){
    const data = JSON.parse(req.responseText);
    
    console.log(data);
    var card = ``;
        
    data.forEach(function(data){
        card += `
        <div class="column">
        <img src='${data.flags.png}' alt='${data.name.common}'>
        <h2>${data.name.common}</h2> <br/>
        <p>Population: ${(data.population / 1000000).toFixed(1)}</p>
        <p>Region: ${data.continents}</p>
        <p>Capital: ${data.capital}</p>
        </div>
        `
        document.getElementById('top').innerHTML = card;
    })
    
    continent.addEventListener('keypress', function (e){
        console.log(continent.value)
            let api = `https://restcountries.com/v3.1/region/${continent.value}`
            const req = new XMLHttpRequest();
            req.open('GET', api)
            req.send();
            
            req.addEventListener('load', function(e){
                const data = JSON.parse(req.responseText);
                
                console.log(data);
                var card = ``;
                    
                data.forEach(function(data){
                    card += `
                    <div class="column">
                    <img src='${data.flags.png}' alt='${data.name.common}'>
                    <h2>${data.name.common}</h2> <br/>
                    <p>Population: ${(data.population / 1000000).toFixed(1)}</p>
                    <p>Region: ${data.continents}</p>
                    <p>Capital: ${data.capital}</p>
                    </div>
                    `
                    document.getElementById('top').innerHTML = card;
                })
            })
    });

    searchCountry.addEventListener('keypress', (e) => {
        if(e.key === 'Enter'){
            btn.classList.remove('hidden');
            let api = `https://restcountries.com/v2/name/${searchCountry.value}`;
            
            const req = new XMLHttpRequest();
            req.open('GET', api)
            req.send();
            
            req.addEventListener('load', function(e){
                const data = JSON.parse(req.responseText);
                
                console.log(data);
                var card = ``;
            
                data.forEach(function(data){
                    card += `
                    <div class="column columnView">
                    <div class="left">
                    <img src='${data.flags.png}' alt='${data.name.common}'>
                    </div>
                   <div class="right">
                   <h2>${data.name}</h2> <br/>
                   <p>Native name: ${data.nativeName}</p>
                   <p>Population: ${data.population}</p>
                   <p>Region: ${data.region}</p>
                   <p>Sub region: ${data.subregion}</p>
                   <p>TLD: ${data.topLevelDomain[0]}</p>
                   <p>Currency: ${data.currencies[0].code}</p>
                   <p>Capital: ${data.capital}</p>
                    <p>Languages: ${data.languages[0].name}</p>
                    </div>
                    </div>
                    `
                    document.getElementById('top').innerHTML = card;
                })
            })

        }
     })
    
})



//switch view mode
mode.addEventListener('click',switchMode)
//Method to help toggle between light and dark mode
function switchMode(){
    if(toggle){
        head.style.color = 'hsl(0, 0%, 100%)';
        head.style.backgroundColor = 'hsl(209, 23%, 22%)';
        body.style.backgroundColor = 'hsl(207, 26%, 17%)';
        toggle = false;
    }else{
        head.style.color = 'hsl(200, 15%, 8%)';
        head.style.backgroundColor = 'white';
        body.style.backgroundColor = 'hsl(0, 0%, 98%)';
        body.style.color = 'black';
        toggle = true; 
    }
}


//After viewing country go back and reload the page
btn.addEventListener('click', back);
function back(){
btn.classList.add('hidden');
location.reload();
}


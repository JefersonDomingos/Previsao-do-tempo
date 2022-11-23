const chaveApi = process.env.NEXT_PUBLIC_APPAPI_KEY;
console.log(chaveApi);
//Seleção de elementos

const apiCountryUrl = "https://countryflagsapi.com/png/";

const inputCity = document.querySelector("#city-input");
const btnSearch = document.querySelector("#search");

const elementCity = document.querySelector("#city");
const elementCountry = document.querySelector("#country");
const elementTemp = document.querySelector("#temperature span");
const elementDesc = document.querySelector("#description");
const elementImgIcon = document.querySelector("#weather-icon");
const elementHumidity = document.querySelector("#humidity span");
const elementWind = document.querySelector("#wind span");
const elementWeatherData = document.querySelector("#weather-data");
const elementMessageError = document.querySelector("#error-mesage");
const elementDivergenceMessage = document.querySelector("#divergence-mesage");
const elementInstruction = document.querySelector("#instruction");


//Funções
const getWeatherData = async (city) => {
    try{
            const apiWeatherUrl = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${chaveApi}&lang=pt_br`);
            const data = await apiWeatherUrl.json();
            
            if(data.erro){
                    throw Error();
            }

            elementCity.innerText = data.name;
            elementTemp.innerText = parseInt(data.main.temp);
            elementDesc.innerText = data.weather[0].description;
            elementImgIcon.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
            elementCountry.setAttribute("src", apiCountryUrl + data.sys.country);
            elementHumidity.innerText = `${data.main.humidity}%`;
            elementWind.innerText = `${data.wind.speed}km/h`;
            elementMessageError.classList.add("hide");
            elementWeatherData.classList.remove("hide");
            elementDivergenceMessage.classList.remove("hide");

            console.log(data);
            
            return data;

        } 

        //Erros api

        catch(erro){
            otherMistakes();
        }
}

const otherMistakes = () =>{
    elementWeatherData.classList.add("hide");
    elementMessageError.innerText = "o nome da cidade está incorreto";
    elementMessageError.classList.remove("hide");
    elementDivergenceMessage.classList.add("hide");
    
}

const inputEmpyt = () =>{
    elementWeatherData.classList.add("hide");
    elementMessageError.innerText = " o nome não pode ficar vazio";
    elementMessageError.classList.remove("hide");
    elementDivergenceMessage.classList.add("hide");

}

//Eventos
btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    const city = inputCity.value;
    if(city === ""){
        inputEmpyt();
    }
    else{
    getWeatherData(city);
    }
    
});

inputCity.addEventListener("keyup",(e) => {
    if(e.code === "Enter"){
        const city = e.target.value;
        if(city === ""){
            inputEmpyt();
        }
        else{
        getWeatherData(city);
        }
    }
});

elementDivergenceMessage.addEventListener("click", () => {
    elementInstruction.classList.toggle("hide");
    console.log("instruçãoes");
});





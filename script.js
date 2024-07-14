let all_country_cont=document.querySelector(".all_country_cont");
let body=document.querySelector("body");
let mode=document.querySelector(".mode");
let cars=document.querySelector("#cars");
let modeicon=document.querySelector(".icon");
let search=document.querySelector("input")
let countryApi="https://restcountries.com/v3.1/all";
let continentApi="https://restcountries.com/v3.1/region/";
//! all countries data
const allCountry =(cData)=>{
    cData.forEach(curElem => {
        let {name,capital,region,population}=curElem;
        let data = document.createElement("a");
        data.classList.add("data");
        data.href=`/dCountry.html?name=${name.common}`
        data.innerHTML=`
        <div class="c_image_main">
                    <img src=${curElem.flags.svg} alt="country flag">
                </div>
                <p class="country_name">
                    ${name.common}
                </p>
                <p class="c_p_r_c">
                    region: <span>${region}</span>
                    <br>
                    population: <span>${population.toLocaleString('en-IN')}</span>
                    <br>
                    capital: <span>${capital}</span>
            </p>
        `  
        all_country_cont.appendChild(data);
    });
}




const  showCountri = async ()=>{
    let res = await fetch(countryApi);
    let data= await res.json();
    //! all countries data
    searchCountry(data);
    //! search countries data
    allCountry(data)
    //! continents countries data
    continents()
}


window.onload=()=>{
    showCountri()
}
// ! dark mode
mode.onclick=()=>{
    body.classList.toggle('darkmode');
    modeicon.classList.toggle("modeicon");
    let darkModeState = JSON.parse(localStorage.getItem("data")) || { darkmode: false };
    darkModeState.darkmode = !darkModeState.darkmode;
    localStorage.setItem('data', JSON.stringify(darkModeState));
}
function searchCountry(data){
    search.addEventListener("input",(e)=>{
        let searchValue=e.target.value;
        all_country_cont.innerHTML=""
       let filterCountry= data.filter((curElem)=>{
          return (curElem.name.common).toLowerCase().includes((searchValue).toLowerCase())
        });
        return allCountry(filterCountry)
    })
}
  function continents(){
 cars.addEventListener("change",async (e)=>{
    all_country_cont.innerHTML="";
    let res = await fetch(continentApi+ e.target.value);
    let data = await res.json();
    return allCountry(data);
  })
}
let check=JSON.parse(localStorage.getItem("data"));
if (check.darkmode) {
    body.classList.add('darkmode');
    modeicon.classList.add("modeicon");
}else{
    body.classList.remove('darkmode');
    modeicon.classList.remove("modeicon");
}
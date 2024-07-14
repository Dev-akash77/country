let ci =document.querySelector(".ci")
let coheading =document.querySelector(".coheading")
let native_name =document.querySelector(".native_name")
let population =document.querySelector(".population")
let region =document.querySelector(".region")
let sregion =document.querySelector(".sregion")
let capital =document.querySelector(".capital")
let tld =document.querySelector(".tld")
let currencies =document.querySelector(".currencies")
let language =document.querySelector(".language");
let borders =document.querySelector(".border");
let back_main =document.querySelector(".back_main");
let cname= new URLSearchParams(window.location.search).get("name");
let countriApi=`https://restcountries.com/v3.1/name/${cname}?fullText=true`;

const putData=([data])=>{
     ci.src=data.flags.svg;
     coheading.innerText=data.name.common;
     native_name.innerText=Object.values(data.name.nativeName)[0].official;
     population.innerText=data.population.toLocaleString('en-IN');
     region.innerText=data.region;
     sregion.innerText=data.subregion;
     capital.innerText=data.capital[0];
     tld.innerText=`(${data.tld})`;
     let curencis=Object.values(data.currencies)[0];
     currencies.innerText=Object.values(curencis).join(' || ');
     language.innerText=Object.values(data.languages);
     if (data.borders) {
        data.borders.forEach(border => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=>res.json()).then(([data])=>{
                let countries_border=document.createElement("a");
                countries_border.classList.add("countries_border");
                countries_border.href=`/dCountry.html?name=${data.name.common}`
                countries_border.innerText=data.name.common;
                borders.appendChild(countries_border);
            })
        });
     }
}
const showData = async()=>{
    let res =await fetch(countriApi);
    let data= await res.json();
    putData(data)
}
showData();
back_main.onclick=()=>{
    history.back()
}
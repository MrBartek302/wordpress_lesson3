var json = [];

async function pobierz() {
    const url = new URL('http://192.168.8.191/wordpress/wp-json/wc/v3/products');
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            authorization: `Basic ${btoa("mrbartek:B4rt3k20071024!@")}`
        }
    });

    const data = await response.json();
    json = data;
    console.log(json);

    if (json.length > 0) {
        for (let i in json) {
            const miejsce = document.getElementById("ogol");
            const divkom = document.createElement("div");
            divkom.classList.add("divik");
    
            const goragora = document.createElement("div");
            goragora.setAttribute("id", `goragora`);
    
            const srodek = document.createElement("div");
            srodek.setAttribute("id", `srodek`);
    
            const dol = document.createElement("div");
            dol.setAttribute("id", "dol");
    
            const dolprawo = document.createElement("div");
            dolprawo.setAttribute("id", "dolprawo");
    
            const dollewo = document.createElement("div");
            dollewo.setAttribute("id", "dollewo");
    
            const buttonminus = document.createElement("button");
            buttonminus.setAttribute("id", "minus");
            buttonminus.innerHTML = "-10";
            buttonminus.addEventListener('click', () => {
                zmien(json[i], false)
            })
    
            const buttonplus = document.createElement("button");
            buttonplus.setAttribute("id", "plus");
            buttonplus.innerHTML = "+10";
            buttonplus.addEventListener('click', () => {
                zmien(json[i], true)
            })
                

            goragora.innerHTML = json[i].name;
            srodek.innerHTML = json[i].price + " dolarów.";
            dollewo.appendChild(buttonminus);
            dolprawo.appendChild(buttonplus);
            divkom.appendChild(goragora);
            divkom.appendChild(srodek);
            divkom.appendChild(dol);
            dol.appendChild(dollewo);
            dol.appendChild(dolprawo);
            miejsce.appendChild(divkom);
        }
    } 
}
pobierz()

async function zmien(json, stan){
    let params = {}
    if(stan == false){
        const obecna_cena = json.regular_price;
        const cena_odejmij = parseFloat(obecna_cena) - 10
        params = {
            regular_price: cena_odejmij
        }
    }else{
        const obecna_cena = json.regular_price;
        const cena_dodaj = parseFloat(obecna_cena) + 10
        params = {
            regular_price: cena_dodaj
        }
    }
        const url = new URL(`http://192.168.8.191/wordpress/wp-json/wc/v3/products/${json.id}`)
        for(let i in params){
          url.searchParams.append(i, params[i])
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                authorization: `Basic ${btoa("mrbartek:B4rt3k20071024!@")}`
            },
        });
        window.location.reload()
}
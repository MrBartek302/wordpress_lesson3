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
            const miejsce = document.querySelector("#ogol");
            const divkom = document.createElement("div");
            divkom.classList.add("divik");
    
            const goragora = document.createElement("div");
            goragora.setAttribute("id", `goragora`);
    
            const srodek = document.createElement("div");
            srodek.setAttribute("id", `srodek${i}`);
    
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
                const miejsce = document.querySelector(`#srodek${i}`)
                const obecnaCena = parseFloat(miejsce.innerHTML);
                const cenaOdejmij = obecnaCena - 10;
                miejsce.innerHTML = cenaOdejmij.toString();
            })
    
            const buttonplus = document.createElement("button");
            buttonplus.setAttribute("id", "plus");
            buttonplus.innerHTML = "+10";
            buttonplus.addEventListener('click', () => {
                const miejsce = document.querySelector(`#srodek${i}`)
                const obecnaCena = parseFloat(miejsce.innerHTML);
                const cenaDodaj = obecnaCena + 10;
                miejsce.innerHTML = cenaDodaj.toString();
            })

            const buttonwyslij = document.createElement("button");
            buttonwyslij.setAttribute("id", "send");
            buttonwyslij.innerHTML = "Zatwierzdź";
            buttonwyslij.addEventListener('click', () => {
                const joool = document.querySelector(`#srodek${i}`)
                const wartosc = joool.innerHTML
                console.log(wartosc)
                zmien(json[i], wartosc)
            })
                

            goragora.innerHTML = json[i].name;
            srodek.innerHTML = json[i].price;
            dollewo.appendChild(buttonminus);
            dolprawo.appendChild(buttonplus);
            dolprawo.appendChild(buttonwyslij);
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

async function zmien(json, wartosc1){
    let params = {}
    const wartosc = wartosc1
    params={
        regular_price: wartosc
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
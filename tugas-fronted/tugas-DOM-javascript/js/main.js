const form = document.getElementById("formItem");
const listBarang = document.getElementById("listBarang");

var items = [
    ['001', 'Keyboard Logitek', 60000, 'Keyboard yang mantap untuk kantoran', 'logitek.jpg'], 
    ['002', 'Keyboard MSI', 300000, 'Keyboard gaming MSI mekanik', 'msi.jpg'],
    ['003', 'Mouse Genius', 50000, 'Mouse Genius biar lebih pinter', 'genius.jpeg'],
    ['004', 'Mouse Jerry', 30000, 'Mouse yang disukai kucing', 'jerry.jpg']
]

function tampilBarang(filterBarang) {
    listBarang.innerHTML = "";
    for (let i = 0; i < filterBarang.length; i++) {
        const barangCard = `
            <div class ="col-4 mt-2"> 
                <div class="card" style="width: 18rem;">
                    <img src="img/${filterBarang[i][4]}" class="card-img-top" height="200px" width="200px" alt="${filterBarang[i][1]}">
                    <div class="card-body">
                        <h5 class="card-title" id="itemName">${filterBarang[i][1]}</h5>
                        <p class="card-text" id="itemDesc">${filterBarang[i][3]}</p>
                        <p class="card-text">Rp.${filterBarang[i][2]}</p>
                        <a href="#" class="btn btn-primary" id="addCart">Tambahkan ke keranjang</a>
                    </div>
                </div>
            </div>
        `
        listBarang.innerHTML += barangCard;
    }
}

function searchBarang(kataKunci) {
    var barangSearch = [];
    for (var j = 0; j < items.length; j++) {
        var searchArray = items[j];
        var searchNama = searchArray[1];
        var isMatch = searchNama.toLowerCase().includes(kataKunci.toLowerCase());
        if (isMatch == true) {
            barangSearch.push(searchArray);
        }
    }
    return barangSearch;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const keyword = document.getElementById("keyword").value;

    var barangList = searchBarang(keyword);

    tampilBarang(barangList);
})

tampilBarang(items);
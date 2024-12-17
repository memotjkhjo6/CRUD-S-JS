
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let catagory = document.getElementById('catagory');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

window.onload = function () {
    showdata();
}

//Get Total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#16a109'
    }
    else {
        total.innerHTML = '';
        total.style.background = '#933310'
    }
}

//Create Product
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
}
else {
    datapro = [];
}

submit.onclick = function () {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        catagory: catagory.value
    }

    if (title.value != ''
        && price.value != ''
        && catagory.value != ''
        && newpro.count < 100) {
        if (mood === 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            }
            else {
                datapro.push(newpro);
            }
        }
        else {
            datapro[tmp] = newpro;
            mood = 'create'
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
    }

    showdata();
    getTotal()
    //Save LoacalStorage
    localStorage.setItem('product', JSON.stringify(datapro));
}

//Clear Inputs
function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    catagory.value = '';
}

//Read
function showdata() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {

        table +=
            `
         <tr>
              <td>${i + 1}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].taxes}</td>
              <td>${datapro[i].ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].catagory}</td>
              <td><button onclick="updatedata(${i})"  id="update">Update</button></td>
              <td><button onclick= "deletedata(${i})" id="delete">delete</button></td>
          </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (datapro.length > 0) {
        btnDelete.innerHTML =
            `<button onclick="deleteAll()">Delete All (${datapro.length})</button>`
    }
    else {
        btnDelete.innerHTML = '';
    }
}
showdata();

//delete
function deletedata(i) {
    localStorage.product = JSON.stringify(datapro);
    datapro.splice(i, 1);
    showdata();
}

function deleteAll() {
    localStorage.clear();
    datapro.splice(0);
    showdata();
}

//Update
function updatedata(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal()
    count.style.display = 'none'
    catagory.value = datapro[i].catagory;
    submit.innerHTML = 'Updata';
    mood = 'update';
    tmp = i;
    scroll({ top: 0, behavior: "smooth" });
}

//Search
let searchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search')

    if (id == 'searchTiTle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }
    else {
        searchMood = 'category'
        search.placeholder = 'Search By Category';
    }
    search.focus();
    search.value = '';
    showdata()
}

function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value)) {
                table +=
                    `
                 <tr>
                      <td>${i}</td>
                      <td>${datapro[i].title}</td>
                      <td>${datapro[i].price}</td>
                      <td>${datapro[i].taxes}</td>
                      <td>${datapro[i].ads}</td>
                      <td>${datapro[i].discount}</td>
                      <td>${datapro[i].total}</td>
                      <td>${datapro[i].catagory}</td>
                      <td><button onclick="updatedata(${i})"  id="update">Update</button></td>
                      <td><button onclick= "deletedata(${i})" id="delete">delete</button></td>
                  </tr>
                `
            }
        }
    }


    else {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].catagory.includes(value)) {
                table +=
                    `
                 <tr>
                      <td>${i}</td>
                      <td>${datapro[i].title}</td>
                      <td>${datapro[i].price}</td>
                      <td>${datapro[i].taxes}</td>
                      <td>${datapro[i].ads}</td>
                      <td>${datapro[i].discount}</td>
                      <td>${datapro[i].total}</td>
                      <td>${datapro[i].catagory}</td>
                      <td><button onclick="updatedata(${i})"  id="update">Update</button></td>
                      <td><button onclick= "deletedata(${i})" id="delete">delete</button></td>
                  </tr>
                `
            }
        }
    }

    document.getElementById('tbody').innerHTML = table;
}



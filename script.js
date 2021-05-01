const cardsContainers = document.querySelector('.cards');
const paginations = document.querySelectorAll('.paginates > button');
const paginates = document.querySelector('.paginates');
const select = document.querySelector('select');

let defaultPerPage = 1;
let defaultPage = 1

fetch(`https://reqres.in/api/users/?page=1&per_page=1`)
    .then(response => response.json())
    .then(response => {

        const data = response.data;
        const page = response.page; // page active
        const per_page = response.per_page; // per_page -> unnecessary
        const total = response.total; // 12 -> untuk dropdown
        const total_pages = response.total_pages; // total_pages -> total pagination

        // const {data, page, per_page, total, total_pages} = response;
        // console.log(response.data)
        // console.log(per_page)


        displayDropdown(total)
        displayCards(data)
        displayPaginations(page, total_pages)
        
    })
    .catch(err => console.error(err))

// Event Select
select.addEventListener('input', function(e){
    let valueSelect = e.target.value;
    defaultPerPage = valueSelect;

    fetch(`https://reqres.in/api/users/?page=1&per_page=${defaultPerPage}`)
        .then(response => response.json())
        .then(response => {

            const {data, page, per_page, total, total_pages} = response;
            console.log(data)
            
            displayPaginations(page, total_pages);
            displayCards(data)
        })
})

// Event Binding
document.addEventListener('click', function(e){
    if(e.target.getAttribute('type') == 'button'){
        let numberPage = e.target.value;
        defaultPage = numberPage;
        
        fetch(`https://reqres.in/api/users/?page=${numberPage}&per_page=${defaultPerPage}`)
            .then(response => response.json())
            .then(response => {
                const {data, page, per_page, total, total_pages} = response;

                displayPaginations(page, total_pages);
                displayCards(data)
            })
            .catch(err => console.log(err))
    }
});

const displayCards = (data) => {
    let cardDOM = '';
    console.log(data)
    // Show data
    data.forEach(isi => {
        const {email, first_name, last_name, avatar} = isi;
        
        cardDOM += `<div class="card">
                        <img src="${avatar}">
                        <p>${email}</p>
                        <h3>${first_name} ${last_name}</h3>
                    </div>`;
    });

    // cardsContainers.innerHTML = '';
    cardsContainers.innerHTML = cardDOM;
}

const displayPaginations = (page, total_pages) => {
    let numberPaginationDOM = '';

    // Looping pagination
    for(let i = 1; i <= total_pages; i++){
        if(i === page){
            numberPaginationDOM += `<button value="${i}" type="button" class="active">${i}</button>`
        } else {
            numberPaginationDOM += `<button value="${i}" type="button">${i}</button>`
        }
    }

    paginates.innerHTML = '';
    paginates.innerHTML = numberPaginationDOM;
}

const displayDropdown = (total) => {
    let optionDOM = '';

    // Looping Dropdown Per Pages
    for(let i = 1; i <= total; i++){
        optionDOM += `<option value="${i}">${i}</option>`;
    }
    
    select.innerHTML = optionDOM;
}
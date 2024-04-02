const input = document.querySelector('.input');
const btnAdd = document.querySelector('.btn-add');
const list = document.querySelector('.list');
let array = JSON.parse(localStorage.getItem('array')) || [];

function display(itemList, idItem) {
    list.innerHTML +=
        ` <li class='item' id=${idItem}>
    <span> ${itemList}</span>
    <button class="delete">Удалить</button>
    </li>`;
};

function fillingLocalStorage(array) {
    localStorage.setItem('array', JSON.stringify(array))
};

function displayArray(array) {
    array.map(elem => {
        let elemTitle = elem.title;
        let elemId = elem.id;
        display(elemTitle, elemId);
    });
};

btnAdd.addEventListener('click', () => {
    let inputValue = input.value;
    let momentClick = Date.now();
    display(inputValue, momentClick);
    array.push({
        title: input.value,
        id: momentClick
    });
    fillingLocalStorage(array);
    input.value = '';
});

displayArray(array);

list.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        let deleteBtn = event.target;
        let needItem = deleteBtn.closest('.item');
        array = array.filter(elem => elem.id != needItem.id);
        fillingLocalStorage(array);
        list.innerHTML = '';
        displayArray(array);
    }
});


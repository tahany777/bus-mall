'use strict';

let imagesArr = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg'
];
let sectionImg = document.getElementById('section-images');
let firstImg = document.getElementById('first-img');
let secondImg = document.getElementById('second-img');
let lastImg = document.getElementById('last-img');
let resultSection = document.getElementById('result-section');
let resultBtn = document.getElementById('btn-result');

let count = 0;

let firstRandomIndex;
let secondRandomIndex;
let lastRandomIndex;
let storageIndex = [];

function SelectProduct(name, path) {
    this.name = name;
    this.path = `./img/${path}`;
    this.clicked = 0;
    this.views = 0;
    SelectProduct.all.push(this);
}
SelectProduct.all = [];

for (let i = 0; i < imagesArr.length; i++) {
    //let img = `./img/${imagesArr[i]}`;
    new SelectProduct(imagesArr[i].split('.')[0], imagesArr[i]);

}
function render() {
    firstRandomIndex = randomProduct(0, imagesArr.length - 1);
    secondRandomIndex = randomProduct(0, imagesArr.length - 1);
    lastRandomIndex = randomProduct(0, imagesArr.length - 1);
    
    do {
        firstRandomIndex = randomProduct(0, imagesArr.length - 1);
        secondRandomIndex = randomProduct(0, imagesArr.length - 1);
        lastRandomIndex = randomProduct(0, imagesArr.length - 1);
    } while (firstRandomIndex === secondRandomIndex || firstRandomIndex === lastRandomIndex || secondRandomIndex === lastRandomIndex || storageIndex.includes(firstRandomIndex) || storageIndex.includes(secondRandomIndex) || storageIndex.includes(lastRandomIndex))
    
    firstImg.src = SelectProduct.all[firstRandomIndex].path;
    secondImg.src = SelectProduct.all[secondRandomIndex].path;
    lastImg.src = SelectProduct.all[lastRandomIndex].path;

    SelectProduct.all[firstRandomIndex].views++;
    SelectProduct.all[secondRandomIndex].views++;
    SelectProduct.all[lastRandomIndex].views++;

    storageIndex = [];
    storageIndex.push(firstRandomIndex);
    storageIndex.push(secondRandomIndex);
    storageIndex.push(lastRandomIndex);
    console.log(storageIndex);
}
function handler(e) {
    if ((e.target.id === 'first-img' || e.target.id === 'second-img' || e.target.id === 'last-img') && count < 25) {
        count++;
        render();
    }
    if (count === 25) {
        chartm();
        sectionImg.removeEventListener("click", handler);
    }
    if (e.target.id === 'first-img') {
        SelectProduct.all[firstRandomIndex].clicked++;
    }
    if (e.target.id === 'second-img') {
        SelectProduct.all[secondRandomIndex].clicked++;
    }
    if (e.target.id === 'last-img') {
        SelectProduct.all[lastRandomIndex].clicked++;
    }
}
function resultViwe() {
    for (let i = 0; i < imagesArr.length; i++) {
        let listItem = document.createElement('li');
        resultSection.appendChild(listItem);
        listItem.textContent = `${SelectProduct.all[i].name} had ${SelectProduct.all[i].clicked} votes, and was seen ${SelectProduct.all[i].views} times.`
    }
    chartm();
    resultBtn.removeEventListener('click', resultViwe);
}
sectionImg.addEventListener('click', handler);
resultBtn.addEventListener('click', resultViwe);
function randomProduct(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomImg = Math.floor(Math.random() * (max - min + 1) + min);
    return randomImg;
}
render();

function chartm() {
    let name = [];
    let view = [];
    let click = [];
    for (let i = 0; i < imagesArr.length; i++) {
        name.push(SelectProduct.all[i].name);
        view.push(SelectProduct.all[i].views);
        click.push(SelectProduct.all[i].clicked);
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: name,
            datasets: [{
                label: `Number of Views`,
                data: view,
                backgroundColor: ['rgb(248, 186, 248)'],
                borderColor: ['#333'],
                borderWidth: 1
            },
            {
                label: 'Number of clicked',
                data: click,
                backgroundColor: ['#333'],
                borderColor: ['rgb(248, 186, 248)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
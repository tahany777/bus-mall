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
        secondRandomIndex = randomProduct(0, imagesArr.length - 1);
        lastRandomIndex = randomProduct(0, imagesArr.length - 1);
    } while (firstRandomIndex === secondRandomIndex || firstRandomIndex === lastRandomIndex || secondRandomIndex === lastRandomIndex)

    firstImg.src = SelectProduct.all[firstRandomIndex].path;
    secondImg.src = SelectProduct.all[secondRandomIndex].path;
    lastImg.src = SelectProduct.all[lastRandomIndex].path;

    SelectProduct.all[firstRandomIndex].views++;
    SelectProduct.all[secondRandomIndex].views++;
    SelectProduct.all[lastRandomIndex].views++;
}
console.log(SelectProduct.all);
function handler(e) {
    if ((e.target.id === 'first-img' || e.target.id === 'second-img' || e.target.id === 'last-img') && count < 25) {
        count++;
    }
    if (count === 25){
        sectionImg.removeEventListener("click", handler);
    }
    if(e.target.id === 'first-img') {
        SelectProduct.all[firstRandomIndex].clicked++;
    }
    if(e.target.id === 'second-img') {
        SelectProduct.all[secondRandomIndex].clicked++;
    }
    if(e.target.id === 'last-img') {
        SelectProduct.all[lastRandomIndex].clicked++;
    }
    render();
}
function resultViwe() {
    for(let i = 0; i < imagesArr.length; i++) {
        let listItem = document.createElement('li');
        resultSection.appendChild(listItem);
        listItem.textContent = `${SelectProduct.all[i].name} had ${SelectProduct.all[i].clicked} votes, and was seen ${SelectProduct.all[i].views} times.`
    }
    resultBtn.removeEventListener('click', resultViwe);
}
sectionImg.addEventListener('click', handler);
resultBtn.addEventListener('click', resultViwe);
function randomProduct(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
render();
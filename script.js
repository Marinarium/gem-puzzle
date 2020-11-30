'use strict'
const frame = document.querySelector('.frame');
const btnChange = document.querySelector('.btn-change');
const tileSize = 100;
const emptyTile = {
    value: 0,
    top: 0,
    left: 0
}
const tiles = [];
tiles.push(emptyTile);

//заполняем массив в рандомном порядке
let numbers = [...Array(15).keys()].map(x => x + 1).sort(() => Math.random() - 0.5);

function moveTile(tilePosition) {
    const tile = tiles[tilePosition];

    //проверяем можем ли передвигать ячейку
    const differenceLeft = Math.abs(emptyTile.left - tile.left);
    const differenceTop = Math.abs(emptyTile.top - tile.top);

    if (differenceLeft + differenceTop > 1) {
        return;
    }

    //задаем координаты ячейки, займет место пустой ячейки
    tile.elem.style.left = `${emptyTile.left * tileSize}px`;
    tile.elem.style.top = `${emptyTile.top * tileSize}px`;

    const tempLeft = emptyTile.left;
    const tempTop = emptyTile.top;

    emptyTile.left = tile.left;
    emptyTile.top = tile.top;

    tile.left = tempLeft;
    tile.top = tempTop;

    const isFinished = tiles.every(tile => {
        return tile.value === tile.top * 4 + tile.left;
    });

    if (isFinished) {
        alert("win!");
    }
}

//Первоначальное постороение
for (let i = 1; i < 16; i++) {
    const tile = document.createElement('div');
    let valueOfTile = numbers[i - 1];
    tile.className = 'tile';
    tile.innerHTML = valueOfTile;

    const left = i % 4;
    const top = (i - left) / 4;

    tiles.push({
        value: valueOfTile,
        left: left,
        top: top,
        elem: tile
    });

    tile.style.left = `${left * tileSize}px`;
    tile.style.top = `${top * tileSize}px`;

    frame.append(tile);

    tile.addEventListener('click', () => {
        moveTile(i);
    });
}

function changePuzzle() {
    let tileElems = document.querySelectorAll('.tile');
    let numbers = [...Array(15).keys()].map(x => x + 1).sort(() => Math.random() - 0.5);

    function changeNumber(tileElem, numberElem) {
        tileElem.innerHTML = numberElem;
    }

    for (let i = 0; i < tileElems.length; i++) {
        changeNumber(tileElems[i], numbers[i]);
    }
}

btnChange.addEventListener('click', changePuzzle);
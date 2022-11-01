'use strict'

const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 5


var gFilterBy = { maxPrice: 0, minRate: 0 }

_creatBooks()

var gBooks


function getBooksForDisplay() {
    return gBooks
}

function _createBook(title, price) {
    const book = {
        id: makeId(),
        title: title,
        price: price,
        imgUrl: '',
        desc: makeLorem(),
        rate: 0,
    }
    return book
}

function _creatBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!books || books.length) {
        books = [_createBook('The Lean Startup', getRandomIntInclusive(1, 45)) ,
        _createBook('The Bitcoin Standard', getRandomIntInclusive(1, 45)),
        _createBook('The 5AM Club', getRandomIntInclusive(1, 45))
        ]
    }
    gBooks = books
    _saveBooksToStorage()
    console.log('gBooks , books:', gBooks, books)
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook() {
    var bookName = prompt('Enter a book name!')
    var bookPrice = +prompt('Enter a book price!')
    const book = _createBook(bookName, bookPrice)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
}

function setFilterBy() {
    var book = updateBook(book.rate)
    book.rate.push(bookRating)
}
function getBookByID(bookId) {
    const book = gBooks.find(book => bookId === book.id)    
    return book
}

function updateBook(bookId, bookPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = bookPrice
    _saveBooksToStorage()
    return book
}

function setBookSort(sortBy) {
    if (sortBy === 'High-to-Low') {
        gBooks.sort((c1, c2) => (c2.price - c1.price))
    }
    if (sortBy === 'Min-rate') {
        gBooks.sort((c1, c2) => (c1.rate - c2.rate))
    }
}


function getInputValue() {
    var inputRating = document.querySelector('.book-rating-input').value
    document.querySelector('.book-the-rating').innerText = inputRating
    // elModal.querySelector('.book-rating-input').innerText = book.rate

    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function setLang(lang) {
    gCurrLang = lang
}

// 
// var today = new Date();
// var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// console.log('today:', today)


// const currDate =
// new Date(Date.now() - (1000 * 60 * 60 * 24 * 365 * 26) - (1000 * 60 * 60 * 24 * 38)+1000*60*60*2)

// const opt = {
//     weekday: 'narrow',
//     year: 'numeric',
//     month: 'short',
//     day: '2-digit',
//     hours: 'numeric',
// }

// console.log(new Intl.DateTimeFormat('he', opt).format(currDate))
// console.log(new Intl.DateTimeFormat('he', { weekday: "short", day: "numeric" }).format(currDate))
// console.log(new Intl.DateTimeFormat('en', opt).format(currDate))
// console.log(new Intl.DateTimeFormat('it', opt).format(currDate))
// console.log(new Intl.DateTimeFormat('he', opt).format())

function searchBook() {
    var input = document.getElementById('search-input').value
    input = input.toLowerCase();
    var books = document.getElementsByClassName('books');
    var bookName = document.getElementsByClassName('book-name');
      
    for (var i = 0; i < books.length; i++) { 
        if (!bookName[i].innerHTML.toLowerCase().includes(input)) {
            books[i].style.display="none";
        }
        else {
            books[i].style.display="table-row";                 
        }
    }
}
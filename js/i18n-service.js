'use strict'

var gTrans = {
    title: {
        en: 'Welcome to my Book shop!',
        he: 'ברוכים הבאים לחנות הספרים שלי!'
    },
    subtitle: {
        en: '',
        he: '',
    },
    'High-to-Low': {
        en: 'High-to-Low',
        he: 'מהמחיר הגבוהה לנמוך',
    },
    'Min-rate': {
        en: 'Min-rate',
        he: 'מהדירוג הנמוך לגבוהה'
    },
    'rate-the-book': {
        en: 'Rate the book from 1 to 10',
        he: 'דרג את הספר מ 1 ל 10',
    },
    'creat-new-book': {
        en: 'Creat new book',
        he: 'צור ספר חדש',
    },
    'book-id': {
        en: 'Id',
        he: 'מספר סידורי',
    },
    'book-Price': {
        en: 'Price',
        he: 'מחיר',
    },
    title2: {
        en: 'Title',
        he: 'שם הספר',
    },
    actions: {
        en: 'Actions',
        he: 'פעולות נוספות'
    },
    'search-a-book': {
        en: 'serach a book..',
        he: 'חפש ספר...'
    },
    'the-book-deatails': {
        en: 'Deatails',
        he: 'פרטים'
    },
    'the-book-update': {
        en: 'Update',
        he: 'עדכון'
    },
    'the-book-remove': {
        en: 'Delete',
        he: 'מחק'
    },
    'search-box': {
        en: 'Search a book..',
        he: 'חפש ספר..'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    // if key is unknown return 'UNKNOWN'
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'
    // get from gTrans
    // If translation not found - use english
    let translateStr = (key[gCurrLang]) ? key[gCurrLang] : key['en']
    return translateStr;
}

function doTrans() {
    // TODO: 
    // var els = document.querySelectorAll('[data-trans]'
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translateVal = getTrans(transKey)
        console.log(translateVal)
        if (typeof el.placeholder === 'string') el.placeholder = translateVal
        else el.innerText = translateVal
    })
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}


function setLang(lang){
    gCurrLang = lang
}

function kmToMiles(km) {
    return km / 1.609;
}


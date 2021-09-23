// Smooth scroll
const links = document.querySelectorAll('[data-scroll]');

let elementId, elementOffset;

links.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    elementId = link.dataset.scroll;
    elementOffset = document.querySelector(elementId).getBoundingClientRect().top;
    
    window.scrollBy({
      top: elementOffset,
      behavior: "smooth"
    });
  });
});


// Menu
const menuBtn = document.querySelector('.menu-btn'),
  menu = document.querySelector('.menu');

menuBtn.addEventListener('click', function() {
  if(menuBtn.classList.contains('menu-btn--active')) {
    menuBtn.classList.remove('menu-btn--active');
  } else {
    menuBtn.classList.add('menu-btn--active');
  }

  if(menu.classList.contains('menu--active')) {
    menu.classList.remove('menu--active');
  } else {
    menu.classList.add('menu--active');
  }
});



// Tabs
const tabsBtns = document.querySelectorAll('.tabs__item'),
  tabsBody = document.querySelectorAll('.tabs__block');

tabsBtns.forEach(function(btn){
  btn.addEventListener('click', function() {
    tabsBody.forEach(function(item){
      item.classList.remove('tab--active');
    });

    let activeTab = document.querySelector(btn.dataset.tab);
    activeTab.classList.add('tab--active');
  });
});



// Price calc
const  controlBtns = document.querySelectorAll('.order__control'),
  orderCount = document.querySelectorAll('.order__count'),
  smallFormat = document.querySelector('.order__small'),
  smallCount = smallFormat.querySelector('.order__count'),
  smallSum = +smallFormat.querySelector('.order__format-sum').textContent,
  bigFormat = document.querySelector('.order__big'),
  bigCount = bigFormat.querySelector('.order__count'),
  bigSum = +bigFormat.querySelector('.order__format-sum').textContent,
  totalSum = document.querySelector('.order__total-sum');
  
let orderFormat, count;


const totalPriceChanger = function() {
  totalSum.textContent = bigCount.value * bigSum + smallCount.value * smallSum;
};


controlBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    orderFormat = btn.closest('.order__format');
    count = orderFormat.querySelector('.order__count');

    if(btn.textContent === '+') {
      count.value++;
    } else if(count.value === '0') {
      return;
    } else if(btn.textContent === '-') {
      count.value--;
    }
    totalPriceChanger();
  });
});

orderCount.forEach(function(count) {
  count.addEventListener('input', function() {
    if(count.value < 0) {
      count.value = 0;
    }

    totalPriceChanger();
  });
});


// Modal
const modalOpenBtns = document.querySelectorAll('[data-modal]'),
  modal = document.querySelector('.modal');

let modalItem;

modalOpenBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    
    if(modalItem != undefined){
      modalItem.classList.remove('modal--active');
    }

    modalItem = document.querySelector(btn.dataset.modal);
    modal.classList.add('modal--active');
    modalItem.classList.add('modal--active');
  });
});


const modalClose = document.querySelector('.modal__close');

modalClose.addEventListener('click', function() {
  modal.classList.remove('modal--active');
  modalItem.classList.remove('modal--active');
});


const modalBtn = document.querySelector('.modal__btn');

modalBtn.addEventListener('click', function() {
  modal.classList.remove('modal--active');
  modalItem.classList.remove('modal--active'); 
});



// Accardeon
const treeHeads = document.querySelectorAll('.tree__head');

let treeItemContainer, treeItem;

treeHeads.forEach(function(btn) {
  btn.addEventListener('click', function(){
    if(btn.classList.contains('tree__head--active')){
      btn.classList.remove('tree__head--active');
    } else {
      btn.classList.add('tree__head--active');
    }
    treeItemContainer = btn.closest('.modal__list-item');
    treeItem = treeItemContainer.querySelector('.tree__item');
    
    if(treeItem.classList.contains('tree--active')){
      treeItem.classList.remove('tree--active');
    } else {
      treeItem.classList.add('tree--active');
    }
  });
});





// Animation
const anim = document.getElementById('anim');

var animData = {
  container: anim,
  path: './anim/MixerSequence.json',
  renderer: 'canvas',
  loop: false,
  autoplay: false,
  name: "animScroll",
}, animScroll, tl;


animScroll = bodymovin.loadAnimation(animData);


animScroll.addEventListener('DOMLoaded', function () {
  tl = new TimelineMax({repeat: 0});
  tl.to({frame: 0}, 1, {
    frame: animScroll.totalFrames - 1,
    onUpdate: function() {
      animScroll.goToAndStop(this.target.frame, true);
    },
    Ease:Linear.easeNone
  });
  
  var controller = new ScrollMagic.Controller();

  var scene = new ScrollMagic.Scene({
    triggerElement: ".wrapper",
    offset: innerHeight / 2,
    duration: innerHeight * 4.5}).setTween(tl).setPin(anim).addTo(controller);
});



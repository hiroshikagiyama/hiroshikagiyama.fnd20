const menu = document.querySelector(".menu");

for(let i = menuArray.length-1 ; i >= 0; i--){
    const {name, img, price, no} = menuArray[i];
    const content = 
        `<div class="menu-card">
            <img class="menu-img" src="images/${img}" alt="">
            <p class="menu-name">${name}</p>
            <p class="menu-price">${price}円</p>
            <div class="counter-button">
                <button class="menu-down" id="menu-down${no}" type="button" onclick="down()">―</button>
                <button class="menu-up" id="menu-up${no}" type="button" onclick="up()">＋</button>
            </div>
        </div>`;
    menu.insertAdjacentHTML("afterbegin", content)
}


// let click = 0;
// function up(event) {
//     click++;
//     document.getElementById('cart-count').innerHTML = click ;
//     console.log('currentTarget :');
//     console.log(event.currentTarget);
//     console.log('target :');
//     console.log(event.target);
//     console.log('-- --');
// }
// function down(event) {
//     if(click <= 0){
//         return click;
//     }
//     click--;
//     document.getElementById('cart-count').innerHTML = click ;
//     console.log('currentTarget :');
//     console.log(event.currentTarget);
//     console.log('target :');
//     console.log(event.target);
//     console.log('-- --');
// }

// let upButton = document.querySelector("#top3-up1");
// let downButton = document.querySelector("top3-down1");

// upButton.addEventListener('click', up);
// downButton.addEventListener('click', down);





// スクロールイベント ====================================
const contentScroll = document.querySelector('.content-scroll');
const reg = 0.4;//スクロール量を変更する場合はここを調整

contentScroll.addEventListener("wheel",(value) => {
    contentScroll.scrollLeft = contentScroll.scrollLeft + value.deltaY * reg;
    console.log(contentScroll.scrollLeft)
}, {passive: true});
// ======================================================

//　縦のスクロール
// const getScrollPercent = (event) => {
//     const scrolled = window.scrollX;// スクロール量
//     console.log(event);
//     console.log(scrolled);
//     const scrollWidth = document.documentElement.scrollWidth;// ページの幅
//     const pageWidth = document.documentElement.clientWidth;// 表示領域の幅
//     const percentage = scrolled / (scrollWidth - pageWidth) * 100;// スクロール割合
//     document.querySelector("#bar").style.width = `${percentage}%`;// 幅を設定
//     console.log(document.querySelector("#bar").style.width);
// }
// document.querySelector('.content-scroll').addEventListener("scroll", getScrollPercent)

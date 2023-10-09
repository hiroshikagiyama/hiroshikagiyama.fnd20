
// メニュー作成 =======================================================
const menu = document.querySelector(".menu");

for(let i = menuArray.length-1 ; i >= 0; i--){
    const {jaName, enName, img, price, no} = menuArray[i];
    let content = "";
    if(no <= 3){
        //人気Top3メニュー表示
        content =
        `<div class="menu-card top3">
            <p class="ninki">人気 No${no}</p>
            <img class="menu-img menu-img-top3" src="images/${img}" alt="">
            <p class="menu-name menu-name-top3">${jaName}</p>
            <p class="menu-price menu-price-top3">${price} 円</p>
            <p class="menu-count menu-count-top3" id="${enName}"></p>
            <div class="counter-button">
                <button class="menu-down top3-down" name="${enName}" id="menu-down${no}" type="button" onclick="down()">―</button>
                <button class="menu-up top3-up" name="${enName}" id="menu-up${no}" type="button" onclick="up()">＋</button>
            </div>
        </div>`;
    }else{
        //メニュー表示
        content = 
        `<div class="menu-card">
            <img class="menu-img" src="images/${img}" alt="">
            <p class="menu-name">${jaName}</p>
            <p class="menu-price">${price} 円</p>
            <p class="menu-count menu-count-menu" id="${enName}"></p>
            <div class="counter-button">
                <button class="menu-down" name="${enName}" id="menu-down${no}" type="button" onclick="down()">―</button>
                <button class="menu-up" name="${enName}" id="menu-up${no}" type="button" onclick="up()">＋</button>
            </div>
        </div>`;
    }
    menu.insertAdjacentHTML("afterbegin", content)
}


// スクロールイベント ====================================
// 画面の左右移動・アイコンの左右移動・アイコンの回転 ３つを制御

const contentScroll = document.querySelector(".content-scroll");
const reg = 0.4;//スクロール量を変更する場合はここを調整

contentScroll.addEventListener("wheel",(value) => {
    contentScroll.scrollLeft = contentScroll.scrollLeft + value.deltaY * reg;
    const pageWidth = document.documentElement.clientWidth;// 表示領域の幅
    const percentage = contentScroll.scrollLeft / (3600 - pageWidth) * 100;
    // document.querySelector("#bar").style.width = `${percentage}%`;// barの幅を設定

    document.querySelector("#rotation").style.marginLeft = `${percentage}%`;// icon移動
    document.querySelector("#rotation-image").style.transform = `rotate(${percentage * 30}deg)`;// icon回転

}, {passive: true});



// 商品カウント、合計金額 =========================================

const buttonUp = document.querySelectorAll(".menu-up");
const buttonDown = document.querySelectorAll(".menu-down");

let count = 0;
const cartArray = [];
let resultCart = {};

// name count のobjectを作る===================================
/**
 * 商品ごとの数をカウントするオブジェクトを作成する
 * @param {*array} getCartArray 
 * @returns 商品名:数量 のkey:value ペアobject
 */
function makeCartObject(getCartArray){
    const setCartArray = [...new Set(getCartArray)]; //重複なしのarray
    resultCart = {}; // 再度空にする
    setCartArray.forEach((searchElement) => {
        let count = 0;
        cartArray.forEach((baseElement) => {
            if(baseElement === searchElement){
                count ++;
            }
        });
        resultCart[searchElement] = count;
    });
    return resultCart;
}

// 価格と数量を計算して表示する ==============================

/**
 * makeCartObject関数からの値を使って金額を合算して表示
 * @param {object} afterMakeCartObjectFunc 商品名:数量 のkey:value ペアobject
 */
function makePriceList(afterMakeCartObjectFunc){
    // 表示用の合計金額
    let showTotalPrice = 0;

    const menuCount = document.querySelectorAll(".menu-count");//各商品の個数表示
    // 各商品の数を一度消す
    for(let i = 0; i < menuCount.length; i++){
        menuCount[i].innerText = "";
    }

    // // リストの子要素を削除
    // while(ulList.children.length > 0){
    //     ulList.removeChild(ulList.children[0])
    // }

    // 各商品の数量と合算の数量と金額を表示
    for(const [key, value] of Object.entries(afterMakeCartObjectFunc)){
        const priceData = menuArray.find(item => item.enName === key);
        const itemCount = document.querySelector(`#${key}`);
        if(priceData){
            const totalPrice = priceData.price * value;
            // liElement.textContent = `${priceData.jaName}:${value} price:${totalPrice}円`;
            showTotalPrice += totalPrice; // 表示用の合計金額
            itemCount.innerText = value; // 各商品に数表示
        }
        // ulList.appendChild(liElement); // li要素を追加
    }
    document.querySelector("#cart-total-price").innerText = `${showTotalPrice} 円`;
}

// Up ====================================================
/**
 * カウントアップして、数量、金額表示用の関数を発動する
 * @param {object} event 
 */
function up(event){
    if(event !== undefined){
        //count
        count ++;
        document.querySelector("#cart-count").innerText = count;
        //pushed array
        cartArray.push(event.target.name);
        makeCartObject(cartArray);
        makePriceList(resultCart)//追加
    }
}
// イベント countUp =======================================
for(let i = 0; i < buttonUp.length; i++){
    buttonUp[i].addEventListener("click",up);
}


// Down ====================================================
/**
 * カウントダウンして、数量、金額表示用の関数を発動する
 * @param {object} event 
 */
function down(event){
    if(event !== undefined){
        const deleteIndex = cartArray.indexOf(event.target.name);
        if(/*count > 0 &&*/ deleteIndex !== -1){
            // count
            count --;
            document.querySelector("#cart-count").innerText = count;
            // delete of cartArray
            cartArray.splice(deleteIndex, 1);
            makeCartObject(cartArray);
            makePriceList(resultCart)//追加
        }else{
            makeCartObject(cartArray);
            makePriceList(resultCart)//追加
        }
    }
}
// イベント countDown =====================================
for(let i = 0; i < buttonDown.length; i++){
    buttonDown[i].addEventListener("click",down);
}

const starContainers = document.querySelectorAll('.stars');
starContainers.forEach((el)=>{
    const starsUL = createElements(el,'ul','main');
    const output = createElements(el,'div','output');
    // const mac = createElements(el,'div','mac');
    for(let x=0;x<5;x++){
        const star = createElements(starsUL, 'li','star');
        star.innerHTML = '&#10029';
        star.starValue = (x+1);
        ["mouseover", "mouseout","click"].forEach((el)=>{
            star.addEventListener(el,starRate);
        })
    }
})

function addYellow(stars, value) {
    stars.forEach((star, index) => {
        star.classList.toggle('yellow', index < value);
    });
}
// function starRate(e){
//     // console.log(e.type);
//     // console.log(e.target.starValue);
//     const eventType = e.type;
//     const parent = e.target.closest('.stars');
//     console.log(parent);
//     const output = parent.querySelector('.output');
//     const curStars = parent.querySelectorAll('.star');
//     if(eventType === 'click'){
//         output.innerHTML = `you rated this ${e.target.starValue} stars`;
//         // output.innerHTML = `you rated this ${77} stars`;

//         addColor(curStars,e.target.starValue);
//     }else if(eventType === 'mouseover'){
//     }
//         addYellow(curStars,e.target.starValue);
// }

function addYellow(curStars,val){
    console.log(val);
    curStars.forEach((star,index)=>{
        if (index > val){
            star.classList.add('Yellow');
        }else{
            star.classList.remove('Yellow'); 
        }
    })
}


function addColor(curStars,val){
    console.log(val);
    curStars.forEach((star,index)=>{
        if (index < val){
            star.classList.add('orange');
        }else{
            star.classList.remove('orange'); 
        }
    })
}

function starRate(e) {
    const parent = e.target.closest('.stars');
    const output = parent.querySelector('.output');
    const curStars = parent.querySelectorAll('.star');

    if (e.type === 'click') {
        output.innerHTML = `You rated this ${e.target.getAttribute('starValue')} stars`;
        curStars.forEach((star, index) => {
            star.classList.toggle('yellow', index < e.target.getAttribute('starValue'));
        });
    }
}

document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', starRate);
    star.addEventListener('mouseover', (e) => {
        const curStars = e.target.closest('.stars').querySelectorAll('.star');
        curStars.forEach((star, index) => {
            star.classList.toggle('yellow', index < e.target.getAttribute('starValue'));
        });
    });
    star.addEventListener('mouseout', (e) => {
        const curStars = e.target.closest('.stars').querySelectorAll('.star');
        curStars.forEach(star => star.classList.remove('yellow'));
    });
});

function createElements(parent,eltype,myClass){
    const el = document.createElement(eltype);
    el.classList.add(myClass);
    parent.append(el);
    return el;
}
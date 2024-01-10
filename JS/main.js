


const hamburguerIcon = document.querySelector('.nav__hamburguer');
const navOverlay = document.querySelector('.nav__overlay');
let currentDropdown = navOverlay;

hamburguerIcon.addEventListener('click', ()=>{
    hamburguerIcon.classList.toggle('nav__hamburguer--open');

    navOverlay.classList.toggle('nav__overlay--show');
});

navOverlay.addEventListener('click', (e)=>{
    e.preventDefault();
    const currentElement = e.target;
    // console.log(e.target.classList.value);

    if( isActive(currentElement, 'nav__parent') ){

        const subMenu = currentElement.parentElement.children[1];
       

        if(window.innerWidth < 768){

            let height = (subMenu.clientHeight == 0) 
                        ? subMenu.scrollHeight : 0;
            // console.log(subMenu.clientHeight);

            subMenu.style.height = `${height}px`;
        }else{

            if( !isActive(subMenu, 'nav__inner--show') ){
                closeDropdown(currentDropdown);
            }
            subMenu.classList.toggle('nav__inner--show');

            currentDropdown = subMenu;

        }

    }
    
});

function isActive(element, string){
    return element.classList.value.includes(string);
}

function closeDropdown(currentDropdown){
    if( isActive(currentDropdown, 'nav__inner--show')){
        currentDropdown.classList.remove('nav__inner--show');
    }
}

window.addEventListener('resize', ()=>{
    closeDropdown(currentDropdown);

    if(window.innerWidth > 768){
        const navInners = document.querySelectorAll('.nav__inner');

        navInners.forEach(navInner =>{
            navInner.style.height = '';
        });
    }
});



function redirectToPage(page) {
    window.location.href = `${page}.html`;
}

// Ejemplos de uso:
// redirectToPage('index');
// redirectToPage('shop');
// redirectToPage('blog');
// redirectToPage('sobre');
// redirectToPage('contacto');
// redirectToPage('car');


/**Functions for each */
function inicio(){
    window.location.href = 'index.html';
}
function shop(){
    window.location.href = 'shop.html';
}
function blog(){
    window.location.href = 'blog.html';
}
function sobre(){
    window.location.href = 'sobre.html';
}
function contacto(){
    window.location.href = 'contact.html';
}
function car(){
    window.location.href = 'car.html';
}
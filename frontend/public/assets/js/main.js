/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}

/*==================== REMOVE MENU MOBILE ====================*/
/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}

navLink.forEach(n => n.addEventListener('click', linkAction));
// 
function mod(){
    const navMenu = document.getElementById('icon')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', mod))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 





var music = document.getElementById("music");
function playMusic(){
    music.play();
}

function load(){
    music.load();
}

if(music.ended == false){

}

var set = document.getElementById("web");

function web(){
    set.sh
}



// muted duration currentTime 
// playbackRate  ended


function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  
  // Dark / light mode
 


        // CV Download with jsPDF
// document.getElementById('downloadCv').addEventListener('click', (e) => {
//     e.preventDefault();
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();
    
//     // Header
//     doc.setFontSize(18);
//     doc.text('Ibrahim Maged Mohamed Al-Asfar', 20, 20);
//     doc.setFontSize(12);
//     doc.text('Phone: +20 1212444617 | Email: marklasfar@gmail.com', 20, 30);
//     doc.text('Address: Zagazig, Sharqia, Egypt | Date of Birth: 11 April 1999', 20, 40);
//     doc.text('GitHub: github.com/Mark-Lasfar | Online Resume: mark-elasfar.web.app', 20, 50);
//     doc.line(20, 55, 190, 55); // Horizontal line

//     // Career Objective
//     doc.setFontSize(14);
//     doc.text('Career Objective', 20, 65);
//     doc.setFontSize(12);
//     doc.text('Passionate Full Stack Web Developer and founder of MGZon AI, an AI-driven global e-commerce platform inspired by Amazon and Shopify. MGZon AI provides personalized shopping experiences and dedicated stores for vendors, targeting global markets. Developed MGpay, an internal payment and profit withdrawal system integrated with Stripe, PayPal, and Visa.', 20, 75, { maxWidth: 170 });

//     // Education
//     doc.setFontSize(14);
//     doc.text('Education', 20, 110);
//     doc.setFontSize(12);
//     doc.text('Bachelor of Information Systems, Alexandria University (2020-2023, Very Good)', 20, 120);

//     // Work Experience
//     doc.setFontSize(14);
//     doc.text('Work Experience', 20, 140);
//     doc.setFontSize(12);
//     doc.text('Founder & Lead Developer, MGZon AI (2023-Present)', 20, 150);
//     doc.text('Developed AI-driven e-commerce platform with integrations to Stripe, PayPal, and warehouse systems.', 20, 160);
//     doc.text('Freelance Developer (2020-2023)', 20, 170);
//     doc.text('Developed e-commerce platforms with API integrations.', 20, 180);
//     doc.text('Unpaid Internship, USBank (Online, 2022)', 20, 190);
//     doc.text('Contributed to financial systems and API integrations.', 20, 200);

//     // Skills
//     doc.setFontSize(14);
//     doc.text('Skills', 20, 220);
//     doc.setFontSize(12);
//     doc.text('HTML5, CSS3, JavaScript, TypeScript, MongoDB, React, Node.js, Python, Django, Docker, PostgreSQL, SQL, Git, Linux, PHP, UX/UI Design, API Integration, Firebase, SEO', 20, 230, { maxWidth: 170 });

//     // Training & Courses
//     doc.setFontSize(14);
//     doc.text('Training & Courses', 20, 260);
//     doc.setFontSize(12);
//     doc.text('FreeCodeCamp: Web Development, JavaScript', 20, 270);
//     doc.text('Online courses: Python, React, TypeScript, Firebase', 20, 280);

//     // GitHub Achievements
//     doc.setFontSize(14);
//     doc.text('GitHub Achievements', 20, 300);
//     doc.setFontSize(12);
//     doc.text('Pull Shark, YOLO, Quickdraw', 20, 310);

//     doc.save('Ibrahim_Al-Asfar_CV.pdf');
// });


// التوليد 
document.getElementById('downloadCv').addEventListener('click', (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/assets/ibrahim.pdf';
    link.download = 'ibrahim.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
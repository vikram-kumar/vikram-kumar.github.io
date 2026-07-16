/* ==========================================================
   VIKRAM KUMAR PORTFOLIO
   SCRIPT.JS
   PART 1 / 3
==========================================================*/

"use strict";

/*=========================================================
CACHE DOM
=========================================================*/

const projectsContainer = document.getElementById("projectsContainer");
const navbar = document.getElementById("navbar");
const hero = document.getElementById("hero");

/*=========================================================
BUILD PROJECTS
=========================================================*/

function renderProjects(){

    if(!projectsContainer) return;

    projectsContainer.innerHTML = "";

    projects.forEach(project=>{

        projectsContainer.innerHTML += createProjectHTML(project);

    });

}

/*=========================================================
PROJECT TEMPLATE
=========================================================*/
function createProjectHTML(project){

    return `

    <article class="project reveal">

        <div class="projectGrid">

            <div class="projectLeft">

                <video
                    class="portfolioVideo"
                    muted
                    playsinline
                    preload="metadata"
                    poster="${project.poster}">

                    <source
                        src="${project.video}"
                        type="video/mp4">

                </video>

            </div>

            <div class="projectRight">

                <h2>

                    ${project.title}

                </h2>

                <div class="projectInfo">

                    <p>

                        <strong>Studio</strong><br>

                        ${project.studio}

                    </p>

                    <p>

                        <strong>Role</strong><br>

                        ${project.role}

                    </p>

                    <p>

                        <strong>Platform</strong><br>

                        ${project.platform}

                    </p>

                </div>

                <p class="projectDescription">

                    ${project.overview}

                </p>

                <div class="projectTags">

                    ${project.tech.map(tag=>`<span>${tag}</span>`).join("")}

                </div>

            </div>

        </div>

        <div class="projectDivider"></div>

    </article>

    `;

}

/*=========================================================
INITIALIZE
=========================================================*/

renderProjects();

/* ==========================================================
   REVEAL ANIMATION
========================================================== */

function initRevealAnimation(){

    const revealItems = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");

            }

        });

    },{

        threshold:0.15

    });

    revealItems.forEach(item=>{

        revealObserver.observe(item);

    });

}

/* ==========================================================
   NAVBAR
========================================================== */

function initNavbar(){

    if(!navbar) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>40){

            navbar.style.background="rgba(9,9,9,.90)";
            navbar.style.backdropFilter="blur(22px)";
            navbar.style.borderBottom="1px solid rgba(255,255,255,.08)";

        }
        else{

            navbar.style.background="rgba(9,9,9,.72)";
            navbar.style.backdropFilter="blur(16px)";
            navbar.style.borderBottom="1px solid rgba(255,255,255,.05)";

        }

    });

}

/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

function initNavigation(){

    const sections=document.querySelectorAll("section");

    const navLinks=document.querySelectorAll("nav a");

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const top=section.offsetTop-140;

            if(window.scrollY>=top){

                current=section.id;

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("current");

            if(link.getAttribute("href")==="#"+current){

                link.classList.add("current");

            }

        });

    });

}

/* ==========================================================
   HERO FADE
========================================================== */

function initHero(){

    if(!hero) return;

    window.addEventListener("scroll",()=>{

        const y=window.scrollY;

        hero.style.opacity=Math.max(1-y/700,.2);

    });

}

/* ==========================================================
   INITIALIZE UI
========================================================== */

initRevealAnimation();

initNavbar();

initNavigation();

initHero();

/* ==========================================================
   VIDEO MANAGER
========================================================== */

function initVideoManager(){

    const videos = document.querySelectorAll(".portfolioVideo");

    if(videos.length===0) return;

    let activeVideo = null;

    videos.forEach(video=>{

        video.controls = false;

        video.dataset.userPaused = "false";

        let hideTimer = null;

        /* -----------------------------
           Show controls on hover
        ----------------------------- */

        const wrapper = video.closest(".projectVideo");

        if(wrapper){

            wrapper.addEventListener("mouseenter",()=>{

                clearTimeout(hideTimer);

                video.controls = true;

            });

            wrapper.addEventListener("mouseleave",()=>{

                hideTimer = setTimeout(()=>{

                    video.controls = false;

                },1500);

            });

        }

        /* -----------------------------
           Manual Pause
        ----------------------------- */

        video.addEventListener("pause",()=>{

            if(video.dataset.autoPaused!=="true"){

                video.dataset.userPaused="true";

            }

        });

        /* -----------------------------
           Manual Play
        ----------------------------- */

        video.addEventListener("play",()=>{

            video.dataset.userPaused="false";

            activeVideo = video;

        });

    });

    /* -----------------------------
       Viewport Observer
    ----------------------------- */

    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            const video = entry.target;

            if(entry.isIntersecting){

                if(video.dataset.userPaused==="true"){

                    return;

                }

                if(activeVideo && activeVideo!==video){

                    activeVideo.dataset.autoPaused="true";

                    activeVideo.pause();

                    activeVideo.dataset.autoPaused="false";

                }

                video.play().catch(()=>{});

                activeVideo = video;

            }
            else{

                video.dataset.autoPaused="true";

                video.pause();

                video.dataset.autoPaused="false";

            }

        });

    },{

        threshold:0.5

    });

    videos.forEach(video=>{

        observer.observe(video);

    });

}

/* ==========================================================
   START VIDEO MANAGER
========================================================== */

initVideoManager();

/* ==========================================================
   CONSOLE SIGNATURE
========================================================== */

console.log(

"%cVikram Kumar Portfolio",

"font-size:22px;font-weight:bold;color:#76D7FF"

);

console.log(

"Designed & Developed by Vikram Kumar"

);

/*=========================================================
LIGHTBOX
=========================================================*/

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeButton = document.querySelector(".lightboxClose");

document.querySelectorAll(".galleryItem img").forEach(image=>{

    image.addEventListener("click",()=>{

        lightboxImage.src = image.src;

        lightbox.classList.add("active");

        document.body.style.overflow="hidden";

    });

});

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow="";

}

closeButton.addEventListener("click",closeLightbox);

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox || e.target.classList.contains("lightboxBackdrop")){

        closeLightbox();

    }

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeLightbox();

    }

});
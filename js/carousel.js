const carousel = document.querySelector('.carousel');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let startPosX = 0;

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mousemove', dragMove);
carousel.addEventListener('touchmove', dragMove);

carousel.addEventListener('mouseup', dragEnd);
carousel.addEventListener('touchend', dragEnd);
carousel.addEventListener('mouseleave', dragEnd);

function dragStart(event) {
    if (event.type === 'touchstart') {
        startPosition = event.touches[0].clientX;
    } else {
        startPosition = event.pageX;
    }
    isDragging = true;
    carousel.classList.add('grabbing');
    cancelAnimationFrame(animationID);
    startPosX = event.clientX || event.touches[0].clientX;
}

function dragMove(event) {
    if (!isDragging) return;
    const currentPosition = event.type === 'touchmove' ? event.touches[0].clientX : event.pageX;
    const diff = currentPosition - startPosition;
    currentTranslate = prevTranslate + diff;
    setCarouselPosition();
}

function dragEnd() {
    isDragging = false;
    carousel.classList.remove('grabbing');
    prevTranslate = currentTranslate;
    requestAnimationFrame(animateScroll);
}

function setCarouselPosition() {
    carousel.style.transform = `translateX(${currentTranslate}px)`;
}

function animateScroll() {
    currentTranslate -= 1;
    prevTranslate = currentTranslate;
    setCarouselPosition();
    animationID = requestAnimationFrame(animateScroll);
}

animateScroll();

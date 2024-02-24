export default function moveSlider(): void {
    let position: number = 0;
    let translateX: number = 0;
    const totalContentWidth: number = 7900;
    const sourcesButtonsWrap = <HTMLElement>document.querySelector('.sources');
    const sourcesWrap = <HTMLElement>document.querySelector('.sources-wrap');
    const arrowLeft = <HTMLElement>document.querySelector('.arrow-left');
    const arrowRight = <HTMLElement>document.querySelector('.arrow-right');
    const width = sourcesWrap.offsetWidth;
    const count = Math.round(totalContentWidth / width);

    checkButtons();

    function checkButtons() {
        arrowLeft.classList.remove('disabled');
        arrowRight.classList.remove('disabled');

        if (position >= count - 1) {
            arrowRight.classList.add('disabled');
        }
        if (position < 1) {
            arrowLeft.classList.add('disabled');
        }
    }

    function moveCarousel(): void {
        if (position === count - 1) {
            translateX = -position * width - width / 2;
            sourcesButtonsWrap.style.transform = `translateX(${translateX}px)`;
        } else {
            translateX = -position * width;
            sourcesButtonsWrap.style.transform = `translateX(${translateX}px)`;
        }
    }

    function moveCarouselToRight() {
        arrowRight.classList.add('disabled');
        arrowLeft.classList.add('disabled');
        position += 1;

        moveCarousel();
        setTimeout(() => {
            arrowRight.classList.remove('disabled');
            arrowLeft.classList.remove('disabled');
            checkButtons();
        }, 2000);
    }

    function moveCarouselToLeft() {
        arrowLeft.classList.add('disabled');
        arrowRight.classList.add('disabled');
        position -= 1;

        if (position < 0) {
            position = -position;
        }
        moveCarousel();
        setTimeout(() => {
            arrowLeft.classList.remove('disabled');
            arrowRight.classList.remove('disabled');
            checkButtons();
        }, 2000);
    }

    arrowLeft.addEventListener('click', () => {
        moveCarouselToLeft();
    });

    arrowRight.addEventListener('click', () => {
        moveCarouselToRight();
    });
}

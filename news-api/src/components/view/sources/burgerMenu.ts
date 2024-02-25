export default function burgerHandler() {
    const burger = <HTMLElement>document.querySelector('.burger');
    const sourcesWrap = <HTMLElement>document.querySelector('.sources-wrap');
    const sourcesItemsContainer = <HTMLElement>document.querySelector('.sources ');
    const body = <HTMLElement>document.body;

    function openBurgerMenu() {
        burger.classList.add('burger_open');
        sourcesWrap.classList.add('sources_open');
        body.classList.add('body_burger-open');
    }

    function closeBurgerMenu() {
        burger.classList.remove('burger_open');
        sourcesWrap.classList.remove('sources_open');
        body.classList.remove('body_burger-open');
    }

    function toggleBurgerMenu() {
        if (burger.classList.contains('burger_open')) {
            closeBurgerMenu();
        } else {
            openBurgerMenu();
        }
    }
    sourcesItemsContainer.addEventListener('click', () => {
        closeBurgerMenu();
    });

    burger.addEventListener('click', toggleBurgerMenu);
}

function createMenuModalTemplate (card, item) {
	return `<div class="modal-card__img-wrap">
            <img src="${card
							.querySelector('img')
							.getAttribute('src')}" alt="photo of ${item.name}">
          </div>
          <div class="modal-card__content">
            <div class="content__description">
              <h4 class="modal-card__title">${item.name}</h4>
              <p class="modal-card__text">${item.description}</p>
            </div>
            <div class="modal-card__additive-wrap">
              <h4 class="card__additive__title">Size</h4>
              <div class="modal__btn-wrap">
                <button class="modal-card__btn modal-btn size__btn modal-card__btn_active ">
                  <span class="modal-btn__title">${Object.keys(
										item.sizes
									)[0].toUpperCase()}</span>
                  <span class="modal-btn__text">${
										Object.values(item.sizes)[0].size
									}</span>
                </button>
                <button class="modal-card__btn modal-btn size__btn">
                  <span class="modal-btn__title">${Object.keys(
										item.sizes
									)[1].toUpperCase()}</span>
                  <span class="modal-btn__text">${
										Object.values(item.sizes)[1].size
									}</span>
                </button>
                <button class="modal-card__btn modal-btn size__btn">
                  <span class="modal-btn__title">${Object.keys(
										item.sizes
									)[2].toUpperCase()}</span>
                  <span class="modal-btn__text">${
										Object.values(item.sizes)[2].size
									}</span>
                </button>
              </div>
            </div>

            <div class="modal-card__additive-wrap">
              <h4 class="card__additive__title">Additives</h4>
              <div class="modal__btn-wrap btn-wrap_additive">
                <button class="modal-card__btn modal-btn additive__btn">
                 <span class="modal-btn__title">1</span>
                 <span class="modal-btn__text">${item.additives[0].name}</span>
                </button>
                <button class="modal-card__btn modal-btn additive__btn">
                 <span class="modal-btn__title">2</span>
                 <span class="modal-btn__text">${item.additives[1].name}</span>
                </button>
                <button class="modal-card__btn modal-btn additive__btn">
                  <span class="modal-btn__title">3</span>
                  <span class="modal-btn__text">${item.additives[2].name}</span>
                </button>
              </div>
            </div>
            <div class="modal-card__price">
              <p class="price-title">Total:</p>
              <p class="price-sum">$${item.price}</p>
            </div>
            <p class="modal-card__text-explain">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
            <button class="modal-card__btn modal-close" type="button">Close</button>
          </div>`;
}
export default createMenuModalTemplate;
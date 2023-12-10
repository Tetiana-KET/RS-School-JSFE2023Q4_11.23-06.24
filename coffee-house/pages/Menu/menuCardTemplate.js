function createMenuCard(currentCategory, index, item) {
	return `<div class="menu-item__img-wrap">
          <img src="../../assets/images/menu/${currentCategory}/${currentCategory}-${index + 1}.png" alt="photo of ${item.name}">
        </div>
        <figcaption class="menu-item__description">
          <h4 class="menu-item__title">${item.name}</h4>
          <p class="menu-item__text">${item.description}</p>
          <span class="menu-item__price">$${item.price}</span>
        </figcaption>`;
}
export default createMenuCard;
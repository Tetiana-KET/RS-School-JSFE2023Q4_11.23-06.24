export function createFormWrapper(classes: CSSModuleClasses): string {
  return `
      <div class="${classes.formWrapper}">
        <div class="${classes.form}">
          <form action="" class="${classes.carForm}" id="create-car">
            <input class="${classes.formNameInput}" type="text" id="create-car-name" name="car-name" minlength="3" placeholder="Car name (min 3 symbols)"><br>
            <input type="color" id="create-car-color" name="car-color" value="#ffffff">
            <button type="button" class="${classes.createBtn} ${classes.button}" id="createBtn" disabled>Create</button>
          </form>
        </div>
        <div class="${classes.form}">
          <form action="" class="${classes.carForm}" id="update-car">
            <input class="${classes.formNameInput}" type="text" id="update-car-name" name="car-name" minlength="3" placeholder="Select car with select button"><br>
            <input type="color" id="update-car-color" name="car-color" value="#ffffff">
            <button type="button" class="${classes.updateBtn} ${classes.button}" disabled id="updateBtn">Update</button>
          </form>
        </div>
      </div>
      <div class="${classes.garageMenuButtons}">
        <button class="${classes.raceBtn} ${classes.button}">Start Race</button>
        <button class="${classes.resetBtn} ${classes.button}" disabled>Reset</button>
        <button class="${classes.generateBtn} ${classes.button}">Generate cars</button>
      </div>`;
}

export function createGarageTitle(page: number, classes: CSSModuleClasses): string {
  return `
        <div class="${classes.carsCount}" id="carsCount">
          <h2></h2>
        </div>
        <div class="${classes.garagePageNumber}">
          <h3 class="${classes.pageNumber}" data-page="${page}" id="pageNumber">Page: ( № ${page} )</h3>
        </div>
    `;
}

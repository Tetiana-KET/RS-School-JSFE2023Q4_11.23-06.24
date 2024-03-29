export function createPageTitle(page: number, classes: CSSModuleClasses, pageName: string): string {
  return `
        <div class="${classes.carsCount}" id="${pageName}CarsCount">
          <h2>Total Winners: 1 </h2>
        </div>
        <div class="${classes.garagePageNumber}">
          <h3 class="${classes.pageNumber}" data-page="${page}" id="${pageName}pageNumber">Page: ( № ${page} )</h3>
        </div>
    `;
}

export function enableStopBtn(carId: number): void {
  const carElementButtons = Array.from(document.querySelectorAll(`#car${carId} button`)) as HTMLButtonElement[];
  carElementButtons.forEach(btn => {
    if (btn.textContent === 'Stop') {
      btn.removeAttribute('disabled');
    } else {
      btn.setAttribute('disabled', 'true');
    }
  });
}

export function disableStopBtn(carId: number): void {
  const carElementButtons = Array.from(document.querySelectorAll(`#car${carId} button`)) as HTMLButtonElement[];
  carElementButtons.forEach(btn => {
    if (btn.textContent === 'Stop') {
      btn.setAttribute('disabled', 'true');
    } else {
      btn.removeAttribute('disabled');
    }
  });
}

export function disableCarBtns(carId: number): void {
  const carElementButtons = Array.from(document.querySelectorAll(`#car${carId} button`)) as HTMLButtonElement[];
  carElementButtons.forEach(btn => {
    btn.setAttribute('disabled', 'true');
  });
}

// export function disableAllCarsBtns(): void {
//   const carButtons = Array.from(document.querySelectorAll(`.${classes.carTrackControls}`));
//   console.log(document.querySelectorAll(`div[data-attribute="carTrackControls"]`));
//   carButtons.forEach(btn => {
//     btn.setAttribute('disabled', 'true');
//   });
// }
// disableAllCarsBtns();

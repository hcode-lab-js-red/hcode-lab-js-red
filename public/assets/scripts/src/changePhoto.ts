const buttonAvatar = document.querySelector("#avatar") as HTMLElement;
const inputFile = document.querySelector("#file") as HTMLInputElement;

buttonAvatar.addEventListener("click", () => {
    inputFile.click();
});
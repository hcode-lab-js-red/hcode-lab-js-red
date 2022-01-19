// const avatarImg = document.querySelector("#avatar-img") as HTMLImageElement;
// const buttonAvatar = document.querySelector("#avatar") as HTMLElement;
// const inputFile = document.querySelector("#file") as HTMLInputElement;

// buttonAvatar.addEventListener("click", () => {
//     inputFile.click();
// });
    
// inputFile.addEventListener("change", () => {

//     if (inputFile.files?.length) {
    
//         const file = inputFile.files[0];   

//         const reader = new FileReader();

//         //inputFile.disabled = false;

//         reader.onload = () => {

//             //inputFile.disabled = true;

//             if (reader.result) {

//                 avatarImg.src = reader.result as string;

//             }

//         }

//         reader.readAsDataURL(file);

//     }   
// });
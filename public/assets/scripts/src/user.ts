import { onAuthStateChanged, getAuth, signOut, updateProfile, updateEmail } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import getFormValues from "./functions/getFormValues";
import { doc, getFirestore, setDoc, onSnapshot, collection } from "firebase/firestore";
import { Dados } from "./types/Dados";


const auth = getAuth(); // Verifica se está logado
const buttonLogout = document.querySelector(".button-logout") as HTMLButtonElement; // seleciona o botão de logout
const profile = document.querySelector(".profile") as HTMLDivElement; // Seleciona a página do perfil
const storage = getStorage(); // obten o storage
const imgAvatar = document.querySelector('img#avatar') as HTMLImageElement;

const app = document.querySelector("#app") as HTMLElement;

if(app) {

    onAuthStateChanged(auth, () => {
    
        if (!auth.currentUser) {
    
            location.href = "login.html";
        
        } 


    });
}


if (profile) {

    const form = profile.querySelector("#form-update") as HTMLFormElement; // formulário
    const imgPreview = profile.querySelector("#photo-preview") as HTMLImageElement; // prévia da foto selecionada
    const inputFile = profile.querySelector("#file") as HTMLInputElement; // input da foto
    const buttonChoose = profile.querySelector(".choose-photo") as HTMLButtonElement; // botão de alterar a foto
    const inputName = form.querySelector("[name=name]") as HTMLInputElement;
    const inputEmail = form.querySelector("[name=email]") as HTMLInputElement;
    const inputPhone = form.querySelector("[name=phone]") as HTMLInputElement;

    const inputAdress = form.querySelector("[name=adress]") as HTMLInputElement;
    const inputNumber = form.querySelector("[name=number]") as HTMLInputElement;
    const inputDistrict = form.querySelector("[name=district]") as HTMLInputElement;
    const inputCity = form.querySelector("[name=city]") as HTMLInputElement;
    let db = getFirestore();

    let dados: Dados[] = [];

    onAuthStateChanged(auth, () => {

        if (!auth.currentUser) {
    
            location.href = "login.html";
        
        } else {

            imgPreview.src = auth.currentUser.photoURL ?? "assets/images/user.svg";
            if(imgAvatar) {
                imgAvatar.src = auth.currentUser.photoURL ?? "assets/images/user.svg";
            }


            inputName.value = auth.currentUser.displayName ?? "";
            inputEmail.value = auth.currentUser.email ?? "";


            onSnapshot(collection(db, "users"), (collection) => {
        
                dados = [];
        
                collection.forEach(doc => {
                    dados.push(doc.data() as Dados);
                });


                renderDados();

        
        
            });
        
            const renderDados = () => {

                 
                    dados.forEach(item => {

                        if(item.uid === auth.currentUser?.uid ) {
                            inputPhone.value = item.phone;
                            inputAdress.value = item.adress;
                            inputNumber.value = item.number as any;
                            inputDistrict.value =item.district;
                            inputCity.value = item.city;

                        }
    
                    });
                   
                
            
                
        
            }


           // console.log(auth.currentUser.uid);
           //console.log("auth.currentUser", auth.currentUser.displayName, auth.currentUser.email, auth.currentUser.phoneNumber)

        }
       

    
    });



        
    

    buttonLogout.addEventListener("click", () => {
        signOut(auth);
    });

    // Ao clicar no botão dispara a janela de selecionar arquivo
    buttonChoose.addEventListener("click", () => {

        inputFile.click();

    });

    inputFile.addEventListener("change", () => {

        if (inputFile.files?.length) {

            const file = inputFile.files[0];

            const reader = new FileReader();

            buttonChoose.disabled = true;

            reader.onload = () => {

                // buttonChoose.disabled = false;

                if (reader.result) {

                    imgPreview.src = reader.result as string;

                }

            }

            reader.readAsDataURL(file);

        }

    });



        form.addEventListener("submit", e => {
    
            e.preventDefault();
    
            const button = form.querySelector("[type=submit]") as HTMLButtonElement;
            // Se foi selecionado um arquivo
            if (inputFile.files?.length) {
                // Pega o primeiro arquivo
                const file = inputFile.files[0];
                // Seleciona a extensão pegando a 2ª parte do tipo de arquivo
                const ext = file.type.split("/")[1];
                // Busca o endereço da foto do storage/photos/nomeAleatorio.extensao
                const fileRef = ref(storage, `photos/${uuidv4()}.${ext}`);
                // Desabilita o botão
                button.disabled = true;
    
               uploadBytes(fileRef, file).then(snapshot => {
    
                getDownloadURL(fileRef).then(url => {
                    // Habilita o botão
                    button.disabled = false;
                    // Se está logado altera a foto dinamicamente
                    if (auth.currentUser) {
                        updateProfile(auth.currentUser, {
                            photoURL: url,
                        });
    
                        const photoEl = document.querySelector("header img#avatar") as HTMLImageElement;
    
                        photoEl.src = url;
    
                    }
    
                });
    
               }).catch(error => {
    
                console.error(error.message);
    
               });
    
            }
    
            
            if(auth.currentUser) {

                const { name, email, phone, adress, number, district, city } = getFormValues(form);
                updateProfile(auth.currentUser, {
                    displayName: name
                });

                updateEmail(auth.currentUser, email).then(() => {
                    console.log("Email updated!")
                    }).catch((error) => {
                    console.error(error.message)
                });


                const updateDataUser = doc(db, 'users', auth.currentUser.uid);
                setDoc(updateDataUser, 
                    {
                    phone: phone,
                    uid: auth.currentUser.uid,
                    adress: adress,
                    number: number,
                    district:district,
                    city: city 
                    },
                    { merge: true }
                );
                      
            }

                
    
                
    
            
    
        });



 }


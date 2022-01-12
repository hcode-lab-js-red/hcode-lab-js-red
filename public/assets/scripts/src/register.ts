import getFormValues from "./functions/getFormValues";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const auth = getAuth();
const errorMessage = document.querySelector(".message-register") as HTMLDivElement;

const formRegister = document.querySelector<HTMLFormElement>("#form-register");


if (formRegister) {

    formRegister.addEventListener("submit", e => {
        e.preventDefault();

        const { email, password, name } = getFormValues(formRegister);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {                
                
                const {user} = userCredential;

                updateProfile(user, {
                    displayName: name
                }).then(() => {

                    location.href = "/";

                }).catch(error => {

                    console.error(error.message);
                    
                });
                
            })
            .catch((error) => {
                console.error(error.message);
                errorMessage.style.display = "block";
            });

    });

}

import "./reset";
import "./user";
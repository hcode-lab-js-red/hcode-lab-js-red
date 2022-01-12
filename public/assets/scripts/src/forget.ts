import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();
const form = document.querySelector<HTMLFormElement>("#form-forget");

if (form) {

    form.addEventListener("submit", e => {

        e.preventDefault();

        const inputEmail = document.querySelector("#form-forget input") as HTMLInputElement;

        const email = inputEmail.value;

        if (email) {

            sendPasswordResetEmail(auth, email)
            .then(() => {

            })
            .catch((error) => console.error(error.message));

        }

    });

}
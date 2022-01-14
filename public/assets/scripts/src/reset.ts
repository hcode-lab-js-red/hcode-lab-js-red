import getFormValues from "./functions/getFormValues";
import { getAuth, confirmPasswordReset, signInWithEmailAndPassword } from "firebase/auth";
import queryStringToJSON from "./functions/queryStringToJSON";

const auth = getAuth();
const form = document.querySelector<HTMLFormElement>("#form-reset");
const messagePassChanged = document.querySelector(".password-changed") as HTMLDivElement;

if (form) {

    form.addEventListener("submit", e => {

        e.preventDefault();

        const { password } = getFormValues(form);
        const { oobCode } = queryStringToJSON();

        confirmPasswordReset(auth, oobCode, password)
            .then(() => {
            
                const email = sessionStorage.getItem("email");

                if (email) {

                    signInWithEmailAndPassword(auth, email, password).then(()=> {

                        messagePassChanged.style.display = "block";

                        location.href = "/";

                    }).catch(error => {

                        location.href = "/login.html";

                    });

                } else {

                    location.href = "/login.html";

                }
            
            })
            .catch((error) => console.error(error.message));

    });

}
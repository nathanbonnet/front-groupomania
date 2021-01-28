import _ from 'lodash';
import "../../scss/style.scss";
import authApi from "../../service/authApi";

const handleUser = async (firstName, lastName) => {
    // nom du compte
    const data = await authApi.getUserById()
    firstName.value = data.firstName;
    lastName.value = data.lastName;
}

document.addEventListener("DOMContentLoaded", async function() {
    if (!authApi.isAuth()) {
        window.location.replace("sign-in.html");
    }

    const deconnexion = document.getElementById("deconnexion");
    deconnexion.addEventListener("click", authApi.logout);

    const firstName = document.getElementById("modification-firstName");
    const lastName = document.getElementById("modification-lastName");

    await handleUser(firstName, lastName);

    const modificationUser = document.getElementById("modification-compte");
    modificationUser.addEventListener("click", () => {
        authApi.putUserById({
            firstName: firstName.value,
            lastName: lastName.value
        })
    });
})

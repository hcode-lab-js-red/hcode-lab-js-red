export function hideAlert(alert: any) {
  setTimeout(() => {
    alert.classList.add("hide");
  }, 3500);
}
export function showAlert(message: string, danger = false) {
  const alertDanger = document.querySelector("#alert");
  if (alertDanger) {
    alertDanger.innerHTML = message;

    if (danger) {
      alertDanger.classList.add("danger");
    } else {
      alertDanger.classList.remove("danger");
    }

    alertDanger.classList.remove("hide");

    hideAlert(alertDanger);
  }
}

export function hideAlert(alert: any) {
  setTimeout(() => {
    alert.classList.add("hide");
  }, 3500);
}
export function showAlertError() {
  return (error: any) => {
    const alertDanger = document.querySelector("#alert");
    if (alertDanger) {
      alertDanger.innerHTML = error.message;
      alertDanger.classList.add("danger");
      alertDanger.classList.remove("hide");
    }

    hideAlert(alertDanger);
  };
}

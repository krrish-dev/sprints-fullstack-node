
createAccCaption = () => {
  let checkbox = document.getElementById("createAcountBtn").checked
  if (checkbox == true) {
    checkbox != checkbox
    document.getElementById('createacccaption').style.display = "block";
  }
  else {
    checkbox != checkbox
    document.getElementById('createacccaption').style.display = "none";
  }

}
shippingAdressCaption = () => {
  let checkbox = document.getElementById("shippingcaptionBtn").checked
  console.log("checkbo")
  if (checkbox == true) {
    checkbox != checkbox
    document.getElementById('shippingCaption').style.display = "block";
  }
  else {
    checkbox != checkbox
    document.getElementById('shippingCaption').style.display = "none";
  }

}

let menuInputs = document.querySelectorAll('#payment-label');
let subMenus = document.querySelectorAll('.paymentCaption');


menuInputs.forEach((input, index) => {
  input.addEventListener('change', () => {
    if (input.checked) {
      subMenus[index].style.display = "block"
    }
  });
  input.addEventListener('blur', () => {
    if (input.checked) {
      subMenus[index].style.display = "none"
    }
  });
});





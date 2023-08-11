
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






// Wasted 2 hours on that, just ignore


// const checkIfOtherCheckboxIsSelected = (currentSelected) => {
//   // console.log(Array.from(menuInputs).some((input, index) => input.checked && index != currentSelected))
//   // // return Array.from(menuInputs).some((input, index) => input.checked && index != currentSelected)
//   // console.log(Array.from(menuInputs).every(input => input.checked))
//   // return Array.from(menuInputs).every(input => input.checked)
//   // const otherRadioButtons = Array.from(menuInputs).filter((_, index) => index != currentSelected)
//   // console.log(otherRadioButtons.some(button => button.checked), otherRadioButtons, otherRadioButtons[2].checked)
//   // return otherRadioButtons.some(button => button.checked)

//   // let isOtherButtonClicked = false
//   // menuInputs.forEach((button, index) => {
//   //   if (index === currentSelected) return
//   //   console.log(button.checked)

//   //   if (button.checked) {
//   //     console.log("sd")
//   //     isOtherButtonClicked = true
//   //   }
//   // })

//   // return isOtherButtonClicked
// }


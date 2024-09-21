const BTN_VALUES = Array.from(document.querySelectorAll(".digit")).map(
  (el) => el.innerHTML
);
// console.log(BTN_VALUES);

const keybord = document.querySelector(".keybord");
const input = document.querySelector("#myInput");

keybord.addEventListener("click", function (event) {
  const btnValue = event.target.innerHTML;
  // console.log(btnValue);

  if (!BTN_VALUES.includes(btnValue)) {
    return;
  }
  input.value = input.value + btnValue;
});

// логика для знака =

const ac = document.querySelector(".ac");
// const body = document.body;

function deleteInputValue() {
  if (input.value) {
    input.value = "";
  }
}

ac.addEventListener("click", deleteInputValue);

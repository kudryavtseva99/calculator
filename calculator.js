// function moveCursorToEnd() {
//   const input = document.getElementById("myInput");
//   const length = input.value.length;
//   input.focus(); // Focus on the input
//   input.setSelectionRange(length, length); // Set the cursor to the end
// }

const BTN_VALUES = Array.from(document.querySelectorAll(".button")).map(
  (el) => el.innerHTML
);
// console.log(BTN_VALUES);

const keybord = document.querySelector(".keybord");
const input = document.querySelector("#myInput");

keybord.addEventListener("click", function (event) {
  const btnValue = event.target.innerHTML;
  console.log(btnValue);

  if (!BTN_VALUES.includes(btnValue)) {
    return;
  }

  input.value = input.value + btnValue;
});

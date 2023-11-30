const inputBox = document.getElementById('inputBox');
const result = document.getElementById('result');
const checkBtn = document.getElementById('checkBtn');
disabledBtn();
function disabledBtn(){
     inputBox.value.length === 0 ? checkBtn.disabled = true : checkBtn.disabled = false;
}
inputBox.addEventListener('keyup', () => {
    disabledBtn();
})
checkBtn.addEventListener('click', () => {

    let inputVal = inputBox.value;
    let reverseVal = inputVal.split('').reverse().join('');

    if (inputVal === reverseVal) {
        result.innerHTML = `<h4>${inputVal} is a Palindrome</h4>`;
    } else {
        result.innerHTML = `<h3>${inputVal} is not a Palindrome</h3>`;
    }

});
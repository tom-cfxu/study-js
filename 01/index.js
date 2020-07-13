// get element
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');



//事件监听 event listener
form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 12);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
})

// show input small
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

//check email is valid
function checkEmail(input) {
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, `邮箱格式错误`)
    };
}

//checkRequired input
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        // console.log(input.value)
        if (input.value.trim() === "") {
            showError(input, `${getKeyWord(input)}为必填项`)
        } else {
            showSuccess(input)
        }
    })
}

//getKeyWord

function getKeyWord(input) {
    return input.placeholder.slice(3);
}

//checkLength
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getKeyWord(input)}至少${min}个字符`);
    } else if (input.value.length > max) {
        max
        showError(input, `${getKeyWord(input)}最多${max}个字符`);
    } else {
        showSuccess(input)
    }
}
//checkPasswordsMatch

function checkPasswordsMatch(input1, input2) {
    if (input1.value != input2.value) {
        showError(input2, "密码不匹配")
    }
}
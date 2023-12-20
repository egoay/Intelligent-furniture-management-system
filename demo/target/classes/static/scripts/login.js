const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
  fistForm.reset();
  container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
  secondForm.reset();
  container.classList.add("right-panel-active");
});
function signUp(userData) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/smarthome/signup',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(userData),
      success: function (response) {
        console.log('Sign Up success:', response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error('Sign Up error:', error);
        reject(error);
      }
    })
  })
}
$(document).ready(function () {
  var fistForm = $('form1');
  fistForm.on('submit', function (e) {
    e.preventDefault();
    var username = $('input[type="text"].input').val();
    var email = $('input[type="email"].input').val();
    var password = $('input[type="password"].input').val();
    var userData = {
      username: username,
      email: email,
      password: password
    };
    signUp(userData)
      .then(function (response) {
        console.log('Sign Up success:', response);
      })
      .catch(function (error) {
        console.error('Sign Up error:', error);
      });
  });
});
function signIn(userData) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/smarthome/login2',
      type: 'POST',
      contentType: 'application/json',
      async:false,
      data: JSON.stringify(userData),
      success: function (response) {
        console.log('Ajax request successful. Response:', response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error('Ajax request error:', error);
        reject(error);
      }
    })
  })
}
$(document).ready(function () {
  var secForm = $('form1');
  secForm.on('submit', function (e) {
    e.preventDefault();
    var username = $('input[type="text"].input').val();
    var password = $('input[type="password"].input').val();
    var userData = {
      username: username,
      password: password
    };
    signIn(userData)
      .then(function (response) {
        console.log('Sign In success:', response);
        if (response === 'success') {
          console.log('Sign In success:', response);
          window.location.href = "/smarthome/home";
        } else {
          showErrorMessage('用户名或密码错误');
        }
      })
      .catch(function (error) {
        console.error('Sign In error:', error);
        showErrorMessage(error);
      });
  });
})
function showErrorMessage(message) {
  // 创建一个提示框元素
  var errorMessage = $('<div>').text(message);
  errorMessage.addClass('error-message');
  // 将提示框插入到页面中
  secForm.append(errorMessage);
  // 2秒后，隐藏提示框并从DOM中移除
  setTimeout(function () {
    errorMessage.hide();
    errorMessage.remove();
  }, 2000);
}
document.addEventListener('DOMContentLoaded', function () {
  const addDeviceLink = document.querySelector('a[data-action="add-device"]');
  const homeContent = document.querySelector('.home-content');
  const addDeviceForm = document.querySelector('#add-device-form');
  const addDeviceButton = document.querySelector('#add-device-button');
  const manageDeviceLink = document.querySelector('a[data-action="device-management"]')
  const manageDeviceFrom = document.querySelector('#manage-device');
  const setmodeLink = document.querySelector('a[data-action="scene-mode"]');
  const setmodeForm = document.querySelector('#set-sense-mode');
  const switchingtimeLink = document.querySelector('a[data-action="time-settings"]')
  const switchingtimeFrom = document.querySelector('#switching-time');
  const manageDeviceseachbutton = document.querySelector('#search-device-button')
  setmodeLink.addEventListener('click', function (event) {//这是场景设置的js
    event.preventDefault(); // 阻止默认链接行为
    homeContent.style.display = 'none';
    addDeviceForm.style.display = 'none';
    manageDeviceFrom.style.display = 'none';
    switchingtimeFrom.style.display = 'none';
    setmodeForm.style.display = 'block';
  });
  switchingtimeLink.addEventListener('click', function (event) {//这是时间设置的js
    event.preventDefault(); // 阻止默认链接行为
    homeContent.style.display = 'none';
    addDeviceForm.style.display = 'none';
    manageDeviceFrom.style.display = 'none';
    setmodeForm.style.display = 'none';
    switchingtimeFrom.style.display = 'block';
  });
  manageDeviceLink.addEventListener('click', function (event) {//这是管理设备的js
    event.preventDefault(); // 阻止默认链接行为
    switchingtimeFrom.style.display = 'none';
    setmodeForm.style.display = 'none';
    homeContent.style.display = 'none';
    addDeviceForm.style.display = 'none';
    manageDeviceFrom.style.display = 'block';
  });
  addDeviceLink.addEventListener('click', function (event) {//这是添加设备的js
    event.preventDefault(); // 阻止默认链接行为
    switchingtimeFrom.style.display = 'none';
    setmodeForm.style.display = 'none';
    manageDeviceFrom.style.display = 'none';
    homeContent.style.display = 'none';
    addDeviceForm.style.display = 'block';
  });
  //提示框的js
  function showMessage(message) {
    // 创建一个提示框元素
    const errorMessage = $('<div>').text(message);
    errorMessage.addClass('error-message');

    // 将提示框插入到页面中
    secForm.append(errorMessage);
    const delay = 2000;
    // 2秒后，隐藏提示框并从DOM中移除
    setTimeout(function () {
      errorMessage.hide();
      errorMessage.remove();
    }, delay);
  }

  addDeviceButton.addEventListener('click', function (event) {//添加设备的API
    event.preventDefault(); // 阻止默认按钮行为

    // 在这里执行确定按钮的操作
    // 可以获取选择框和输入框的值，并进行相应的处理

    // 示例：打印选择框和输入框的值
    var room = $('select[id=room-select].select').val();
    var devicetype = $('select[id=device-type-select].select').val();
    var devicename = $('input[id=device-name-input].input').val();
    var devicemessage = {
      room: room,
      devicetype: devicetype,
      devicename: devicename
    }
    function transport(Data) {
      return new Promise(function (resolve, reject) {
        fetch('/api/addnewdevice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(Data)
        })
            .then(function (response) {
              if (response.ok) {
                resolve(response.json());
              } else {
                reject('请求出错');
              }
            })
            .catch(function (error) {
              reject(error);
            });
      })
    }
    // 可以在此处执行其他逻辑，如保存设备信息、发送服务器请求等
    transport(devicemessage)
        .then(function (response) {
          if (response === 'success') {
            showMessage('成功添加新设备')
          } else {
            showMessage('添加失败，请检查是否已有相同的设备名');
          }
        })
        .catch(function (error) {
          showMessage(error);
        });
  });
});
//这是添加设备的js
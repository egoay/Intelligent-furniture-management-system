//这是添加设备的js
document.addEventListener('DOMContentLoaded', function() {
    const addDeviceLink = document.querySelector('a[data-action="add-device"]');
    const homeContent = document.querySelector('.home-content');
    const addDeviceForm = document.querySelector('#add-device-form');
    const addDeviceButton = document.querySelector('#add-device-button');
    const manageDeviceLink=document.querySelector('a[data-action="device-management"]')
    const manageDeviceFrom = document.querySelector('#manage-device');
    manageDeviceLink.addEventListener('click', function(event) {//这是添加设备的js
      event.preventDefault(); // 阻止默认链接行为
      homeContent.style.display = 'none';
      addDeviceForm.style.display = 'none';
      manageDeviceFrom.computedStyleMap.display='none';
    });
    //这是设备管理的js
    addDeviceLink.addEventListener('click', function(event) {//这是添加设备的js
      event.preventDefault(); // 阻止默认链接行为
      manageDeviceFrom.style.display = 'none';
      homeContent.style.display = 'none';
      addDeviceForm.style.display = 'block';
    });
    
    addDeviceButton.addEventListener('click', function(event) {
      event.preventDefault(); // 阻止默认按钮行为
      
      // 在这里执行确定按钮的操作
      // 可以获取选择框和输入框的值，并进行相应的处理
    
      // 示例：打印选择框和输入框的值
      var room=$('select[id=room-select].select').val();
      var devicetype=$('select[id=device-type-select].select').val();
      var devicename=$('input[id=device-name-input].input').val();
      var devicemessage={
        room:room,
        devicetype:devicetype,
        devicename:devicename
      }
      function showMessage(message) {
        // 创建一个提示框元素
        var errorMessage = $('<div>').text(message);
        errorMessage.addClass('error-message');
    
        // 将提示框插入到页面中
        secForm.append(errorMessage);
    
        // 2秒后，隐藏提示框并从DOM中移除
        setTimeout(function() {
          errorMessage.hide();
          errorMessage.remove();
        }, 2000);
      }
      function transport(Data){
        return new Promise(function(resolve, reject){
          $.ajax({
            url:'/api/addnewdevice',
            type: 'POST',
            contentType:'application/json',
            data: JSON.stringify(Data),
            success: function(response) {
            resolve(response);
            },
            error: function(xhr, status, error) {
              reject(error);
            }
          })
        })
      }
      // 可以在此处执行其他逻辑，如保存设备信息、发送服务器请求等
      transport(devicemessage)
      .then(function(response) {
        if(response==='success'){
          showMessage('成功添加新设备')
        }else{
          showMessage('添加失败，请检查是否已有相同的设备名');
        }
      })
      .catch(function(error) {
        showMessage(error);
      });
    });
  });
  //这是添加设备的js
// 在页面加载完成后发送请求获取场景模式数据
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.querySelector('.overlay');
    const addmodal = document.querySelector('.add-sense-mode');
    const senseModes = [                                                       //这是参考
        { "id": 1, "rulename": "场景模式1" },
        { "id": 2, "rulename": "场景模式2" },
        { "id": 3, "rulename": "场景模式3" },
    ];
    const senseModes2 = [                                                       //这是参考
        { id: 1, name: "默认模式" },
        { id: 2, name: "睡眠模式" },
    ];
    const modedevicemessage = [
        { mode: "场景模式1", room: "卧室", name: "LED灯1" },                    //这也是参考
        { mode: "场景模式1", room: "客厅", name: "大灯" },
        { mode: "场景模式1", room: "客厅", name: "空调1" }
    ];
    renderSenseModes(senseModes);
    showMessage("欢迎回来");
    fetchSenseModes();
    const buttons = document.querySelectorAll('.setModeButton');
    buttons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            var buttonType = event.target.dataset.type;
            switch (buttonType) {
                case 'applyButton':
                    applySenseModes();
                case 'editButton':
                    showSetModal();
                case 'disapplyButton':
                    disapplySenseModes();
            }
        })
    })
    const addSenseMode = document.getElementById('add-sense-mode-button');
    addSenseMode.addEventListener('click', function () {
        overlay.style.display = 'block';
        addmodal.style.display = 'block';
    })
    var button1 = document.querySelector('.confirm-creat-mode-button');
    button1.addEventListener('click', function () {
        // 获取输入框元素
        var input = document.querySelector('.add-mode-input');
        // 检查输入框中的数据
        var data = input.value;
        if (data) {
            createSenseMode(data);
            addmodal.style.display = 'none';
            overlay.style.display = 'none';
            fetchSenseModes();
        } else {
            addmodal.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
});
async function createSenseMode(mode) {                                                       //这个是添加场景模式的接口，我会给你一个场景模式的名称，然后你需要在规则表里增加一个同名的场景模式，如果重名，则不添加，返回“添加模式失败”，若成功，则返回“添加模式成功”
    try {
        const response = await fetch('api/addMode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mode)
        });

        if (!response.ok) {
            throw new Error('请求出错');
        }
        const result = await response.json();
        showMessage(result);//定义result为“添加模式成功”‘“添加模式失败”
    } catch (error) {
        throw new Error(error);
    }
}
function showSetModal() {//这是修改按钮绑定的函数，弹窗，表的控制两个函数；//working
    const parent = this.parentNode;
    const parentparent = parent.parentNode;
    const name = parentparent.querySelector('h3');
    getDeviceMessageFromMode(name);
}
function showModeMessage(mode,modename) {//mode里有许多senseMode//working
    const table = document.getElementById("change-mode-table");//弹窗中的表
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.change-mode-modal');//弹窗
    const comfirmButton = document.getElementById("comfirm-edit-button");
    const addDeviceToModeButton = document.getElementById("add-device-to-mode-button");
    overlay.style.display = 'block';// 弹窗遮罩层
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    mode.forEach(function (senseMode) {//每个senseMode有room,name,表示房间名和设备名，一个senseMode表示该模式关联的一个设备
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell();
        const cell2 = newRow.insertCell();
        const cell3 = newRow.insertCell();
        const delectBtton = document.createElement('button');
        delectBtton.addEventListener('click', function (event) {
            delectModeDevice(senseMode.mode, senseMode.room, senseMode.name);
            var row = event.target.parentNode.parentNode; // 获取按钮所在的行
            const rowToDelete = table.rows[row];
            table.removeChild(rowToDelete);
        })
        cell1.innerHTML = senseMode.name;
        cell2.innerHTML = senseMode.room;
        cell3.appendChild(delectBtton);
    });
    modal.style.display = 'block';
    comfirmButton.addEventListener('click', function () {//working
        modal.style.display = 'none';
        overlay.style.display = 'none';

    })
    addDeviceToModeButton.addEventListener('click', function () {
        showAddModal(modename);
    })
}
function showAddModal(modename) {//mode
    const addDeviceToModeModal = document.querySelector('.add-sense-modal');
    const overlay = document.querySelector('.overlay');
    const comfirmAddButton = document.getElementById("comfirm-add-device-button");
    const searchDeviceButton = document.querySelector("search-mode-device-button");
    const modal = document.querySelector('.change-mode-modal');
    modal.style.style.display = 'none';
    addDeviceToModeModal.style.display = 'block';
    searchDeviceButton.addEventListener('click', function () {
        var type = document.getElementById("mode-device-select-type").value;
        var room = document.getElementById("mode-device-select-room").value;
        var devicemessage = {
            type: type,
            room: room,
        };
        showSelectedModeDevice(devicemessage,modename);
    })
    comfirmAddButton.addEventListener('click', function () {
        addDeviceToModeModal.style.display = 'none';
        modal.style.display = 'block';
    })
}
async function showSelectedModeDevice(Data,modename) {                                                   //这个是查询设备的接口，我会发送给你一组数据，其中type是类型，room是房间，你要根据两个信息查询设备，然后返回这些设备的名称,确保result.forEach(device=>{var name=device.name})有效
    try {
        const response = await fetch('/api/showSelectedModeDevice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data)
        });

        if (!response.ok) {
            throw new Error('请求出错');
        }
        const result = await response.json();
        renderadddevicetable(result,modename)
    } catch (error) {
        throw new Error(error);
    }
};
function renderadddevicetable(devicemessages,modename) {
    const addDeviceToModetable = document.getElementById("add-mode-device-table");
    while (addDeviceToModetable.rows.length > 1) {
        addDeviceToModetable.deleteRow(1);
    }
    devicemessages.forEach(devicemessage => {
        const row = addDeviceToModetable.insertRow();
        const nameCell = row.insertCell();
        const actionsCell = row.insertCell();
        nameCell.textContent = devicemessage.name;
        const addButton = document.createElement('button');
        addButton.textContent = "添加设备";
        addButton.addEventListener('click', function () {
            addDeviceToModetable(modename, devicemessage.name);
        })
        actionsCell.appendChild(addButton);
    })
}
async function addDeviceToModetable(modename,devicename) {                                            //这是在模式中添加设备的接口，我传给你包含两个数据的结构，其中modename是场景名称,devicename是设备名，你需要根据名称找到对应的id,然后在中间表中加入对应两个id的行
    const requestData = {
        modename: modename,
        devicename: devicename
    };
    try {
        const response = await fetch('api/addDeviceToModetable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('请求出错');
        }
        const result = await response.json();
        showMessage(result);                                                                     //定义result为“成功”‘“失败”或“设备不存在”
    } catch (error) {
        throw new Error(error);
    }
}
async function delectModeDevice(mode, room, device) {                                            //这是在模式中删除数据的接口，我传给你包含三个数据的结构，其中mode是删除的场景名称，room是房间名，device是设备名，你需要根据名称找到对应的id,然后在中间表中找到对应两个id的元组（行），然后删除它
    const requestData = {
        mode: mode,
        room: room,
        device: device
    };
    try {
        const response = await fetch('api/delectModeDevice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('请求出错');
        }
        const result = await response.json();
        showMessage(result);                                                                      //定义result为“成功”‘“失败”或“设备不存在”
    } catch (error) {
        throw new Error(error);
    }
}
function showMessage(message) {
    const modal = document.querySelector('.show-message-modal');
    const overlay = document.querySelector('.overlay');
    const pElement = document.querySelector('.show-message-modal p');
    pElement.textContent = message;
    overlay.style.display = 'block';
    modal.style.display = 'block';
    const hideModeButton = document.getElementById('showMessageModeConfirmButton');
    hideModeButton.removeEventListener('click', hideMessage);
    hideModeButton.addEventListener('click', hideMessage);
}
function hideMessage() {
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.show-message-modal');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}
async function getDeviceMessageFromMode(modename) {                                                  //这是获取模式对应哪些设备的接口，我会传给你一个模式名，然后你根据这个模式名，在规则表里查询模式id，根据这个id，在中间表里查询设备id，根据这些设备id,在设备表里查询设备信息，然后传给我数据，其中，每一个设备信息都包括：我传给的模式名mode,房间信息room,设备名称name
    try {
        const response = await fetch('api/getModeDeviceMessageSenseMode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modeid)
        });

        if (!response.ok) {
            throw new Error('请求出错');
        }
        const result = await response.json();
        showModeMessage(result,modename);
    } catch (error) {
        throw new Error(error);
    }
}
async function applySenseModes(modeid) {                                                           //这是应用模式的接口，我给你模式的名称，然后你去改变该模式的状态为开，如果有其他模式开着，那么就关闭原有模式，根据这个模式名去中间表查询有什么设备，然后将相应的设备状态设置为开
    try {                                                                                          //如果模式已经是
        const response = await fetch('api/applySenseMode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modeid)
        });

        if (!response.ok) {
            throw new Error('请求出错');
        }
        const result = await response.json();
        if (result === 'success') {
            showMessage("应用模式成功");
        } else if (result === 'repeat') {
            showMessage("模式已应用");
        }
    } catch (error) {
        throw new Error(error);
    }
}
async function disapplySenseModes(modeid) {                                                   //这是取消应用的接口
    try {
        const response = await fetch('api/disapplySenseMode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modeid)
        });

        if (!response.ok) {
            throw new Error('请求出错');
        }
        const result = await response.json();
        if (result === 'success') {
            showMessage("取消应用成功");
        } else if (result === 'repeat') {
            showMessage("模式未应用,无法取消");
        }
    } catch (error) {
        throw new Error(error);
    }
}
async function fetchSenseModes() {                                                                 // 发送获取场景模式的请求给后端
    try {
        const response = await fetch('api/fetchSenseMode', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('请求出错');
        }
        const result = await response.json();

        renderSenseModes(result);
    } catch (error) {
        throw new Error(error);
    }
}
function renderSenseModes(senseModes) {
    console.log(senseModes);
    const senseModeContainer = document.getElementById("set-sense-mode-container");
    // 清空容器中的内容，以便重新渲染
    senseModeContainer.innerHTML = "";

    // 遍历场景模式数据，创建并添加卡片元素
    senseModes.forEach(function (senseMode) {//result,有许多senseMode
        const card = createSenseModeCard(senseMode);//senseMode作为参数
        senseModeContainer.appendChild(card);
    });
}

function createSenseModeCard(senseMode) {
    console.log(senseMode);
    const card = document.createElement("div");
    card.classList.add("sense-mode-card");

    // 创建卡片的应用按钮和修改按钮
    const applyButton = document.createElement("button");
    applyButton.textContent = "应用";
    applyButton.classList.add("setModeButton");
    // 根据按钮的需求添加相应的点击事件处理逻辑
    applyButton.setAttribute('data-type', 'applyButton')
    const editButton = document.createElement("button");
    editButton.textContent = "修改";
    editButton.classList.add("setModeButton");
    editButton.setAttribute('data-type', 'editButton')
    // 根据按钮的需求添加相应的点击事件处理逻辑
    const disapplyButton = document.createElement("button");
    disapplyButton.textContent = "取消应用";
    disapplyButton.classList.add("setModeButton");
    disapplyButton.setAttribute('data-type', 'disapplyButton')
    // 创建卡片的标题和按钮容器
    const title = document.createElement("h3");
    title.textContent = senseMode.rulename;
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(applyButton);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(disapplyButton);

    // 添加标题和按钮容器到卡片中
    card.appendChild(title);
    card.appendChild(buttonContainer);

    return card;
}
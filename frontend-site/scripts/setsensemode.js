// 在页面加载完成后发送请求获取场景模式数据
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.querySelector('.overlay');
    const addmodal = document.querySelector('.add-sense-mode');
    const senseModes = [
        { id: 1, name: "场景模式1" },
        { id: 2, name: "场景模式2" },
        { id: 3, name: "场景模式3" },
    ];
    const modedevicemessage = [
        { mode: "场景模式1", room: "卧室", name: "LED灯1" },
        { mode: "场景模式1", room: "客厅", name: "大灯" },
        { mode: "场景模式1", room: "客厅", name: "空调1" }
    ];
    renderSenseModes(senseModes);
    showMessage("你好");
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
    var button1 = document.querySelector('.comfirm-add-mode-button');//working
    button1.addEventListener('click', function () {
        // 获取输入框元素
        var input = document.querySelector('.add-mode-input');
        // 检查输入框中的数据
        var data = input.value;
        if (data) {
            createSenseMode(data);
        } else {
            addmodal.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
    const addSenseMode = document.getElementById('add-sense-mode-button');//working
    addSenseMode.addEventListener('click', function () {
        overlay.style.display = 'block';
        addmodal.style.display = 'block';
    })
});
async function createSenseMode(mode) {
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
function showSetModal() {//这是修改按钮绑定的函数，弹窗，表的控制两个函数；
    const parent = this.parentNode;
    const parentparent = parent.parentNode;
    const name = parentparent.querySelector('h3');
    getDeviceMessageFromMode(name);

}
function showModeMessage(mode) {//mode里有许多senseMode
    const table = document.getElementById("change-mode-table");//弹窗中的表
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.change-mode-modal');//弹窗
    const comfirmButton = document.getElementById("comfirm-edit-button");
    comfirmButton.addEventListener('click', function () {//working

    })
    overlay.style.display = 'block';// 弹窗遮罩层
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    mode.forEach(function (senseMode) {//每个senseMode有mode,room,name,表示模式名，房间名和设备名，一个senseMode表示该模式关联的一个设备
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
}
async function delectModeDevice(mode, room, device) {
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
        showMessage(result);//定义result为“成功”‘“失败”或“设备不存在”
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
async function getDeviceMessageFromMode(modeid) {
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
        showModeMessage(result);
    } catch (error) {
        throw new Error(error);
    }
}
async function applySenseModes(modeid) {
    try {
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
async function disapplySenseModes(modeid) {
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
async function fetchSenseModes() {
    // 发送获取场景模式的请求给后端
    try {
        const response = await fetch('api/fetchSenseMode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('请求出错');
        }
        const result = await response.json();
        renderSenseModes(result);//reslut作为参数
    } catch (error) {
        throw new Error(error);
    }
}
function renderSenseModes(senseModes) {
    const senseModeContainer = document.getElementById("set-sense-mode-container");

    // 清空容器中的内容，以便重新渲染
    senseModeContainer.innerHTML = "";

    // 遍历场景模式数据，创建并添加卡片元素
    senseModes.forEach(function (senseMode) {//reslut,有许多senseMode
        const card = createSenseModeCard(senseMode);//senseMode作为参数
        senseModeContainer.appendChild(card);
    });
}

function createSenseModeCard(senseMode) {
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
    title.textContent = senseMode.name;
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
document.addEventListener('DOMContentLoaded', function () {
    const manageDeviceseachbutton = document.querySelector('#search-device-button')
    var buttons = document.querySelectorAll('.modiButton');
    const table = document.getElementById('managepagetable');
    buttons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            var buttonType = event.target.dataset.type;
            var row = event.target.parentNode.parentNode; // 获取按钮所在的行
            var roomCell = row.cells[0];
            var room = roomCell.textContent;
            var nameCell = row.cell[1];
            var name = nameCell.textContent;
            switch (buttonType) {
                case 'modifyRoomButton':
                    const newRoom = prompt("请输入新的房间信息", currentRoom);
                    cellChange(row, 0, newRoom, room, name, "房间");
                case 'modifyTypeButton':
                    const newType = prompt("请输入新的类型名", currentType);
                    cellChange(row, 1, newType, room, name, "类型");
                case 'modifyNameButton':
                    const newName = prompt("请输入新的设备名称", currentName);
                    cellChange(row, 2, newName, roomname, "名称");
                case 'modifyStatusButton':
                    const newStatus = prompt("请输入新的设备状态", currentStatus);
                    cellChange(row, 3, newStatus, room, name, "状态");
                case 'removeDeviceButton':
                    removeDevice(row, room, name);
            }
        })
    })
    async function removeDevice(row, room, name) {                         //这是删除设备的API，如果有中间表，则把中间表涉及这个设备的元组也删除
        var Data = {
            room: room,
            name: name
        };
        try {
            const response = await fetch('/api/removeDevice', {
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
            if (result === 'success') {
                const rowToDelete = table.rows[row];
                table.removeChild(rowToDelete);
            } else {
                window.alert(result);
            }
        } catch (error) {
            throw new Error(error);
        }
    }//
    async function cellChange(row, line, newName, room, name, type) {             //这是改变字段名的API
        var Data = {
            room: room,
            name: name,
            type:type,
            newName:newName
        };
        try {
            const response = await fetch('/api/cellChange', {
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
            if (result === 'success') {
                var cellToModify = row.cell[line];
                cellToModify.innerHTML = newName;
            } else {
                window.alert(result);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    function renderdevicetable(devices) {//数据渲染的js
        const table = document.getElementById("managepagetable");
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }
        devices.forEach(device => {
            const row = table.insertRow();

            const roomCell = row.insertCell();
            roomCell.textContent = device.room;

            const typeCell = row.insertCell();
            typeCell.textContent = device.type;

            const nameCell = row.insertCell();
            nameCell.textContent = device.name;

            const statusCell = row.insertCell();
            statusCell.textContent = device.status;

            const actionsCell = row.insertCell();
            // 添加按钮和其对应的逻辑
            const modifyRoomButton = document.createElement('button');
            modifyRoomButton.textContent = '修改房间';
            modifyRoomButton.classList.add('modifyButton');
            modifyRoomButton.setAttribute('data-type', 'modifyRoomButton')
            actionsCell.appendChild(modifyRoomButton);
            const modifyTypeButton = document.createElement('button');
            modifyTypeButton.textContent = '修改房间';
            modifyTypeButton.classList.add('modifyButton');
            modifyTypeButton.setAttribute('data-type', 'modifyTypeButton')
            actionsCell.appendChild(modifyTypeButton);
            const modifyNameButton = document.createElement('button');
            modifyNameButton.textContent = '修改名称';
            modifyNameButton.classList.add('modifyButton');
            modifyNameButton.setAttribute('data-type', 'modifyNameButton')
            actionsCell.appendChild(modifyNameButton);
            const modifyStatusButton = document.createElement('button');
            modifyStatusButton.textContent = '改变状态';
            modifyStatusButton.classList.add('modifyButton');
            modifyStatusButton.setAttribute('data-type', 'modifyStatusButton')
            actionsCell.appendChild(modifyStatusButton);
            const removeDeviceButton = document.createElement('button');
            removeDeviceButton.textContent = '删除设备';
            removeDeviceButton.classList.add('modifyButton');
            removeDeviceButton.setAttribute('data-type', 'removeDeviceButton')
            actionsCell.appendChild(removeDeviceButton);
        })
    }
    manageDeviceseachbutton.addEventListener('click', function (event) {                              //这是查询的API
        event.preventDefault();
        var type = document.getElementById("device-select-type").value;
        var room = document.getElementById("device-select-room").value;
        var devicemessage = {
            type: type,
            room: room
        };
        async function transport(Data) {//
            try {
                const response = await fetch('/api/searchdevice', {
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
                renderdevicetable(result.devices)
            } catch (error) {
                throw new Error(error);
            }
        };
        transport(devicemessage);
    });//
});

document.addEventListener('DOMContentLoaded', function () {
    const manageDeviceseachbutton = document.querySelector('#search-device-button')
    const table = document.getElementById('managepagetable');
    function addEventListenerToButton(){
        var buttons = document.querySelectorAll('.modifyButton');
        buttons.forEach(function (button) {
            button.addEventListener('click', function (event) {
                var buttonType = event.target.dataset.type;
                var row = event.target.parentNode.parentNode; // 获取按钮所在的行
                var roomCell = row.cells[0];
                var room = roomCell.textContent;
                var nameCell = row.cells[1];
                var name = nameCell.textContent;
                switch (buttonType) {
                    case 'modifyRoomButton':
                        const newRoom = prompt("请输入新的房间信息", currentRoom);
                        cellChange(row, 0, newRoom, room, name, "房间");
                        break;
                    case 'modifyTypeButton':
                        const newType = prompt("请输入新的类型名", currentType);
                        cellChange(row, 1, newType, room, name, "类型");
                        break;
                    case 'modifyNameButton':
                        const newName = prompt("请输入新的设备名称", currentName);
                        cellChange(row, 2, newName, roomname, "名称");
                        break;
                    case 'modifyStatusButton':
                        const newStatus = prompt("请输入新的设备状态", currentStatus);
                        cellChange(row, 3, newStatus, room, name, "状态");
                        break;
                    case 'removeDeviceButton':
                        removeDevice(row, room, name);
                        break;
                }
            })
        })
    }
    async function removeDevice(row, roomname, devicename) {
        var Data = {
            roomname: roomname,
            devicename: devicename
        };

        try {
            const response = await fetch('device/removeDevice', {
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
            if (result.status === 'success') {
                if (row >= 0 && row < table.rows.length) {
                    const rowToDelete = table.rows[row];

                    if (rowToDelete instanceof Node) {
                        table.removeChild(rowToDelete);
                    } else {
                        console.error('rowToDelete is not a valid Node:', rowToDelete);
                    }
                } else {
                    console.error('Invalid row index:', row);
                }
            } else {
                window.alert(result.error || '未知错误');  // 显示错误信息，如果有的话
            }
        } catch (error) {
            console.error(error);
            throw new Error('请求处理失败');
        }
    }
    async function cellChange(row, line, newName, room, name, type) {             //这是改变字段名的API
        var Data = {
            roomname: room,
            devicename: name,
            type:type,
            newdevicename:newName
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
            roomCell.textContent = device.roomname;

            const typeCell = row.insertCell();
            typeCell.textContent = device.type;

            const nameCell = row.insertCell();
            nameCell.textContent = device.devicename;

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
        addEventListenerToButton();
    }
    manageDeviceseachbutton.addEventListener('click', function (event) {                              //这是查询的API
        event.preventDefault();
        var type = document.getElementById("device-select-type").value;
        var room = document.getElementById("device-select-room").value;
        var devicemessage = {
            type: type,
            roomname: room
        };
        async function transport(Data) {//
            try {
                const response = await fetch('devices/searchdevice', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Data)
                });

                if (!response.ok) {
                    throw new Error('请求出错');
                }
                // 检查状态码
                if (response.status === 204) {
                    // 204 表示 No Content，即成功但没有数据返回
                    console.log('请求成功，但没有返回数据');
                    return;
                }

                const result = await response.json();
                console.log('解析后的数据:', result);


                // 输出实际返回的数据，用于调试
                console.log('实际返回的数据:', result);
                if (!result.devices) {
                    console.error('服务器返回的数据格式不正确');
                    return;
                }
                renderdevicetable(result.devices)
            } catch (error) {
                console.error('服务器错误:', error);
                showMessage(error);
            }
        };
        transport(devicemessage);
    });//
});
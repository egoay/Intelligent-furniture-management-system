package com.example.demo.controller;
import com.example.demo.entity.Device;
import com.example.demo.service.Deviceservice;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/smarthome")
public class Devicecontroller {
    @Autowired
    public Deviceservice deviceservice;

    @GetMapping(value = "/add")
    public String addpage() {
        return "adddevice";
    }

    @PostMapping("/api/addnewdevice")
    public ResponseEntity<?> insertDevice(
            @RequestParam("room") String room,
            @RequestParam("devicetype") String devicetype,
            @RequestParam("devicename") String devicename) {

        // 验证输入是否有效
        if (room.isEmpty() || devicetype.isEmpty() || devicename.isEmpty()) {
            return ResponseEntity.badRequest().body("参数不能为空");
        }

        Device newDevice = new Device();
        // 假设你的 Device 实体有 setRoom, setType, setName 方法
        newDevice.setRoomname(room);
        newDevice.setType(devicetype);
        newDevice.setDevicename(devicename);
        newDevice.setStatus("关"); // 假设设备默认状态为 "关"

        // 设备服务层逻辑，用于添加设备
        Device createdDevice = deviceservice.addDevice(newDevice);

        if (createdDevice != null && createdDevice.getDevicename() != null) {
            // 返回状态码 201（Created）和新创建的设备
            return new ResponseEntity<>(createdDevice, HttpStatus.CREATED);
        } else {
            // 如果创建失败，返回状态码 400（Bad Request）
            return ResponseEntity.badRequest().body("创建设备失败");
        }
    }
    @DeleteMapping("/{devicename}")
    public void deleteDevice(@PathVariable("devicename") String deviceName) {
        deviceservice.deleteDevice(deviceName);
    }
    @GetMapping("/devices")
    public ResponseEntity<List<Device>> getDevices(
            @RequestParam("roomname") String roomname,
            @RequestParam("type") String type) {
        try {
            List<Device> devices = deviceservice.getDevice(roomname, type);
            if (devices.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(devices);
        } catch (Exception e) {
            // 日志记录异常信息。
            // 注意：在生产环境中不要返回敏感信息。
            return ResponseEntity.internalServerError().body(null);
        }
    }

}
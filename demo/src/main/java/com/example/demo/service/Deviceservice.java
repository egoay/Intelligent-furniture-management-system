package com.example.demo.service;

import com.example.demo.entity.Device;

import java.util.List;

public interface Deviceservice {
    Device createDevice(Device newDevice);
    Device getDeviceById(int device_id);
    List<Device> getAllDevices();
    Device updateDevice(int device_id, Device deviceDetails);
    void deleteDevice(int device_id);
}

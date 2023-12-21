package com.example.demo.service.impl;

import com.example.demo.entity.Device;
import com.example.demo.mapper.Devicemapper;
import com.example.demo.service.Deviceservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Deviceserviceimpl implements Deviceservice {

    private final Devicemapper deviceMapper;

    @Autowired
    public Deviceserviceimpl(Devicemapper deviceMapper) {
        this.deviceMapper = deviceMapper;
    }

    public Device addDevice(Device device) {
        deviceMapper.insertDevice(device);
        return device;
    }

    public void deleteDevice(String deviceName) {
        deviceMapper.deleteDeviceByName(deviceName);
    }

    public void updateDevice(Device device) {
        deviceMapper.updateDevice(device);
    }

    public List<Device> getDevice(String roomname,String type) {
        return deviceMapper.findDevices(roomname,type);
    }

}


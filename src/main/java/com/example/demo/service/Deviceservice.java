package com.example.demo.service;

import com.example.demo.entity.Device;
import com.example.demo.service.impl.Deviceserviceimpl;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public interface Deviceservice {

    Device addDevice(Device device);

    void deleteDevice(String deviceName);

    void updateDevice(Device device);

    List<Device> getDevice(String roomname,String type);

}

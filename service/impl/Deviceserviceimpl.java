package com.example.demo.service.impl;

import com.example.demo.entity.Device;
import com.example.demo.repository.DeviceRepository;
import com.example.demo.service.Deviceservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Deviceserviceimpl implements Deviceservice {

    private final DeviceRepository deviceRepository;

    @Autowired
    public Deviceserviceimpl(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    @Override
    public Device createDevice(Device newDevice) {
        return deviceRepository.save(newDevice);
    }

    @Override
    public Device getDeviceById(int deviceId) {
        Optional<Device> device = deviceRepository.findById(deviceId);
        return device.orElseThrow(() -> new RuntimeException("Device not found."));
    }

    @Override
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    @Override
    public Device updateDevice(int deviceId, Device deviceDetails) {
        Device device = getDeviceById(deviceId);
        device.setRule_id(deviceDetails.getRule_id());
        device.setDevice_name(deviceDetails.getDevice_name());
        device.setTemperature(deviceDetails.getTemperature());
        device.setLight(deviceDetails.getLight());
        return deviceRepository.save(device);
    }

    @Override
    public void deleteDevice(int deviceId) {
        deviceRepository.deleteById(deviceId);
    }
}

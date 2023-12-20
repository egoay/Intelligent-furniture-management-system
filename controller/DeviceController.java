package com.example.demo.controller;

import com.example.demo.dto.DeviceDTO;
import com.example.demo.entity.Device;
import com.example.demo.mapper.Devicemapper;
import com.example.demo.service.Deviceservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/devices")
public class DeviceController {

    private final Deviceservice deviceService;
    private final Devicemapper deviceMapper;

    @Autowired
    public DeviceController(Deviceservice deviceService, Devicemapper deviceMapper) {
        this.deviceService = deviceService;
        this.deviceMapper = deviceMapper;
    }

    @PostMapping
    public ResponseEntity<DeviceDTO> createDevice(@RequestBody DeviceDTO deviceDTO) {
        Device device = deviceMapper.toEntity(deviceDTO);
        Device createdDevice = deviceService.createDevice(device);
        DeviceDTO responseDTO = deviceMapper.toDTO(createdDevice);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeviceDTO> getDeviceById(@PathVariable int id) {
        Device device = deviceService.getDeviceById(id);
        DeviceDTO deviceDTO = deviceMapper.toDTO(device);
        return ResponseEntity.ok(deviceDTO);
    }

    @GetMapping
    public List<DeviceDTO> getAllDevices() {
        List<Device> devices = deviceService.getAllDevices();
        return devices.stream().map(deviceMapper::toDTO).collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeviceDTO> updateDevice(@PathVariable int id, @RequestBody DeviceDTO deviceDTO) {
        Device deviceDetails = deviceMapper.toEntity(deviceDTO);
        Device updatedDevice = deviceService.updateDevice(id, deviceDetails);
        DeviceDTO responseDTO = deviceMapper.toDTO(updatedDevice);
        return ResponseEntity.ok(responseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable int id) {
        deviceService.deleteDevice(id);
        return ResponseEntity.ok().build();
    }
}

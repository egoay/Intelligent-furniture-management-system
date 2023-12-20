package com.example.demo.mapper;
import com.example.demo.dto.DeviceDTO;
import com.example.demo.entity.Device;
import org.springframework.stereotype.Component;
@Component
public class Devicemapper {
    public  DeviceDTO toDTO(Device device) {
        DeviceDTO dto = new DeviceDTO();
        dto.setDeviceId(device.getDevice_id());
        dto.setRuleId(device.getRule_id());
        dto.setDeviceName(device.getDevice_name());
        dto.setTemperature(device.getTemperature());
        dto.setLight(device.getLight());
        return dto;
    }
    public  Device toEntity(DeviceDTO deviceDTO) {
        Device device = new Device();
        device.setDevice_id(deviceDTO.getDeviceId());
        device.setRule_id(deviceDTO.getRuleId());
        device.setDevice_name(deviceDTO.getDeviceName());
        device.setTemperature(deviceDTO.getTemperature());
        device.setLight(deviceDTO.getLight());
        return device;
    }
}

package com.example.demo.dto;

public class DeviceDTO {
    private int deviceId;
    private int ruleId;
    private String deviceName;
    private String temperature;
    private String light;

    // Getters and Setters

    public int getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(int deviceId) {
        this.deviceId = deviceId;
    }

    public int getRuleId() {
        return ruleId;
    }

    public void setRuleId(int ruleId) {
        this.ruleId = ruleId;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }

    public String getLight() {
        return light;
    }

    public void setLight(String light) {
        this.light = light;
    }
}

package com.example.demo.entity;

public class Device {
    private int device_id;
    private int rule_id;
    private String device_name;
    private String temperature;
    private String light;
    public int getDevice_id() {
        return device_id;
    }
    public void setDevice_id(int device_id) {
        this.device_id = device_id;
    }
    public int getRule_id() {
        return rule_id;
    }
    public void setRule_id(int rule_id) {
        this.rule_id = rule_id;
    }

    public String getDevice_name() {
        return device_name;
    }

    public void setDevice_name(String device_name) {
        this.device_name = device_name;
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

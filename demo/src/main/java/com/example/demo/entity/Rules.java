package com.example.demo.entity;
public class Rules {
    private int rule_id;
    private String rule_name;
    private String start_time;
    private String end_time;
    private String device_status;
    public int getRule_id() {
        return rule_id;
    }
    public void setRule_id(int rule_id) {
        this.rule_id = rule_id;
    }
    public String getRule_name() {
        return rule_name;
    }
    public void setRule_name(String rule_name) {
        this.rule_name = rule_name;
    }
    public String getStart_time() {
        return start_time;
    }
    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }
    public String getEnd_time() {
        return end_time;
    }
    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }
    public String getDevice_status() {
        return device_status;
    }
    public void setDevice_status(String device_status) {
        this.device_status = device_status;
    }
}

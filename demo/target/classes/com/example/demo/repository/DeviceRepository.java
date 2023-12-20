package com.example.demo.repository;

import com.example.demo.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Integer> {

    List<Device> findByRuleId(Integer ruleId);

    Optional<Device> findByDeviceName(String deviceName);

}

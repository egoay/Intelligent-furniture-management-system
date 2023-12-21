package com.example.demo.mapper;
import com.example.demo.entity.Device;
import java.util.List;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.Insert;

@Mapper
@Repository
public interface Devicemapper {
  void insertDevice(Device device);

   int deleteDeviceByName(String deviceName);

    int updateDevice(Device device);
    List<Device> findDevices(@Param("roomname") String roomname,@Param("type") String type);
}

package com.example.demo.mapper;
import com.example.demo.entity.Users;
import java.util.List;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
@Mapper
@Repository
public interface Usersmapper extends JpaRepository<Users,Long > {
    //登录
    Users findByUsername(String username); //通过用户名uname查找用户，注意要按照JPA的格式使用驼峰命名法
    Users findByUsernameAndUserpassword(String username, String userpassword);//通过用户名username和密码查找用户
    //查询所有用户

}


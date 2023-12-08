package com.example.demo.mapper;
import com.example.demo.entity.Users;
import java.util.List;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
@Mapper
@Repository
public interface Usersmapper extends JpaRepository<Users,Integer > {
    //登录
    Users findByUname(String username); //通过用户名uname查找用户，注意要按照JPA的格式使用驼峰命名法
    Users findByUnameAndPassword(String username, String user_password);//通过用户名uname和密码查找用户
    //查询所有用户

}


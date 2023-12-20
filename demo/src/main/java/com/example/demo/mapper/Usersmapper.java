package com.example.demo.mapper;
import com.example.demo.entity.Users;
import java.util.List;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Result;
@Mapper
@Repository

public interface Usersmapper {
    int addUser(Users user);
    //验证用户名
    Users findUserName(String userName);

    //验证密码
    String findPassword(String username);
}


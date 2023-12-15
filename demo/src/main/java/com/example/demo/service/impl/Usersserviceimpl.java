package com.example.demo.service.impl;
import com.example.demo.entity.Users;
import com.example.demo.service.Usersservice;
import com.example.demo.mapper.Usersmapper;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
@Service
public class Usersserviceimpl implements Usersservice {
    @Autowired
    @Resource
    private Usersmapper usersmapper;

    //登录
    @Override
    public Users loginService(String username, String user_password) {
        // 如果账号密码都对则返回登录的用户对象，若有一个错误则返回null
        Users users = usersmapper.findByUsernameAndUserpassword(username, user_password);
        // 重要信息置空
        if (users != null) {
            users.setUserpassword("");
        }
        return users;
    }

    //注册
    @Override
    public Users registService(Users users) {
        if (usersmapper.findByUsername(users.getUsername()) != null) {
            // 无法注册
            return null;
        } else {
            //返回创建好的用户对象(带uid)
            Users newUser = usersmapper.save(users);
            if (newUser != null) {
                newUser.setUserpassword("");
            }
            return newUser;
        }
    }

    //删除

}

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
    private final Usersmapper usersmapper;

    @Autowired
    public Usersserviceimpl(Usersmapper usersmapper) {
        this.usersmapper = usersmapper;
    }

    @Override
    public int addUser(Users user) {
        return usersmapper.addUser(user);
    }

    @Override
    public Users findUserName(String userName) {
        return usersmapper.findUserName(userName);
    }

    @Override
    public String findPassword(String username) {
        return usersmapper.findPassword(username);
    }
}

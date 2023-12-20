package com.example.demo.service;
import com.example.demo.entity.Users;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public interface Usersservice {
    int addUser(Users user);
    Users findUserName(String userName);
    String findPassword(String username);
}

package com.example.demo.controller;
import com.example.demo.entity.Users;
import com.example.demo.mapper.Usersmapper;
import com.example.demo.service.Usersservice;
import com.example.demo.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
@RestController
@Controller
@RequestMapping("/users")
public class Userscontroller {
    @Resource
    private Usersservice usersservice;
    @PostMapping("/login")
    public Result<Users> loginController(@RequestParam String uname, @RequestParam String password){
        Users user = usersservice.loginService(uname, password);
        if(user!=null){
            return Result.success(user,"登录成功！");
        }else{
            return Result.error("123","账号或密码错误！");
        }
    }
    @PostMapping("/register")
    public Result<Users> registController(@RequestBody Users newUser){
        Users user = usersservice.registService(newUser);
        if(user!=null){
            return Result.success(user,"注册成功！");
        }else{
            return Result.error("456","用户名已存在！");
        }
    }
}

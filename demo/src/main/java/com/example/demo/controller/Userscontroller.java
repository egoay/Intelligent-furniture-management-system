package com.example.demo.controller;
import com.example.demo.entity.Users;
import com.example.demo.service.Usersservice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
@RestController
@Controller
@RequestMapping("/users")
public class Userscontroller {
    @Resource
    private Usersservice usersservice;
    @PostMapping("/signin")
    public ResponseEntity<Users> loginController(@RequestBody Users user){
        Users loggedInUser = usersservice.loginService(user.getUsername(),user.getUserpassword());
        if(loggedInUser!=null){
            return ResponseEntity.ok(loggedInUser);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
    @PostMapping("/signup")
    public ResponseEntity<Users> registController(@RequestBody Users newUser){
        Users registereduser = usersservice.registService(newUser);
        if(registereduser!=null){
            return ResponseEntity.ok(registereduser);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}

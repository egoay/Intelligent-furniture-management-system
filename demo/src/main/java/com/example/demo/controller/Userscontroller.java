package com.example.demo.controller;
import com.example.demo.entity.Users;
import com.example.demo.service.Usersservice;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpSession;

@Slf4j
@Controller
@RequestMapping("/smarthome")
public class Userscontroller {
    @Autowired
    public Usersservice usersservice;
    @GetMapping (value = "/login")
    public String loginpage() {
        return "login";
    }
    //登录
    @PostMapping("/login2")
    @ResponseBody
    public RedirectView loginSuccess(@RequestParam MultiValueMap<String, String> formData, HttpSession session) {
        String username = formData.getFirst("username");
        String password = formData.getFirst("password");

        try {
            // 先查找一下有没有该账号
            Users user = usersservice.findUserName(username);
            String storedPassword = null;
            if (user != null) {
                // 如果有账号则判断账号密码是否正确
                storedPassword = usersservice.findPassword(username);
                if (storedPassword.equals(password)) {
                    // 添加到session保存起来
                    session.setAttribute("loginUser", user);
                    log.info("Login successful for user: " + username);
                    return new RedirectView("/smarthome/home");
                } else {
                    return new RedirectView("/smarthome/login?error=InvalidCredentials");
                }
            } else {
                return new RedirectView("/smarthome/login?error=InvalidCredentials");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new RedirectView("/smarthome/login?error=ServerError");
        }
    }
    @GetMapping (value = "/home")
    public String homepage() {
        return "home";
    }
    //注册
    @PostMapping("/signup")
    public ModelAndView signUp(@RequestParam MultiValueMap<String, String> formData) {
        String username = formData.getFirst("username");
        String password = formData.getFirst("password");
        String email = formData.getFirst("email");

        try {
            // 先查找一下有没有该账号
            Users existingUser = usersservice.findUserName(username);
            if (existingUser != null) {
                ModelAndView mav = new ModelAndView("login");
                mav.addObject("error", "UsernameAlreadyExists");
                return mav;
            }
            // 创建新用户
            Users newUser = new Users();
            newUser.setUsername(username);
            newUser.setPassword(password);
            newUser.setEmail(email);
            // 设置权限（根据实际情况设置）
            newUser.setPermission("USER");

            // 保存用户到数据库
            usersservice.addUser(newUser);

            log.info("User registered successfully: " + username);
            return new ModelAndView("login");
        } catch (Exception e) {
            e.printStackTrace();
            ModelAndView mav = new ModelAndView("login");
            mav.addObject("error", "RegistrationError");
            return mav;
        }
    }
}

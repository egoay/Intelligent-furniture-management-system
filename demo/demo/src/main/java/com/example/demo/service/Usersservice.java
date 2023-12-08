package com.example.demo.service;
import com.example.demo.entity.Users;
import java.util.List;
public interface Usersservice {
    /**
     * 登录业务逻辑
     * @param uname 账户名
     * @param password 密码
     * @return
     */
    Users loginService(String uname, String password);
    /**
     * 注册业务逻辑
     * @param users 要注册的User对象，属性中主键uid要为空，若uid不为空可能会覆盖已存在的user
     * @return
     */
    Users registService(Users users);
}

package com.example.demo.service;
import com.example.demo.entity.Users;
import java.util.List;
public interface Usersservice {
    /**
     * 登录业务逻辑
     * @param username 账户名
     * @param userpassword 密码
     * @return
     */
    Users loginService(String username, String userpassword);
    /**
     * 注册业务逻辑
     * @param users 要注册的User对象，属性中主键uid要为空，若uid不为空可能会覆盖已存在的user
     * @return
     */
    Users registService(Users users);
    //删除

}

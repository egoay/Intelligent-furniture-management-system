package com.example.demo.entity;
import javax.persistence.*;
@Table(name="users")
@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    private String username;
    private String permission;
    private String password;
    private String email;
    public Users(Long user_id,String username,String permission,String password,String email){
        this.user_id=user_id;
        this.email=email;
        this.permission=permission;
        this.username=username;
        this.password=password;
    }

    public Users() {

    }


    public long getUser_id() {
        return user_id;
    }
    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPermission() {
        return permission;
    }
    public void setPermission(String permission) {
        this.permission = permission;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}

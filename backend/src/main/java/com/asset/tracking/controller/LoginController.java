package com.asset.tracking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class LoginController {

    @GetMapping("/login")
    public String login() {
        // 返回登录页面，这里使用Spring Security默认的登录页面
        return "login";
    }
    
    @GetMapping("/")
    public String home() {
        // 首页或仪表盘页面
        return "index";
    }
}
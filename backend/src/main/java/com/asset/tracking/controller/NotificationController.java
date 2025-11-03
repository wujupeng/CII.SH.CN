package com.asset.tracking.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    // 通知数据模型类
    static class Notification {
        private String id;
        private String title;
        private String message;
        private String type; // info, success, warning
        private boolean read;
        private Date timestamp;

        public Notification(String title, String message, String type) {
            this.id = UUID.randomUUID().toString();
            this.title = title;
            this.message = message;
            this.type = type;
            this.read = false;
            this.timestamp = new Date();
        }

        // Getters and Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public boolean isRead() { return read; }
        public void setRead(boolean read) { this.read = read; }
        public Date getTimestamp() { return timestamp; }
        public void setTimestamp(Date timestamp) { this.timestamp = timestamp; }
    }

    // 模拟通知数据存储
    private static List<Notification> notifications = new ArrayList<>();

    // 静态初始化一些示例通知数据
    static {
        notifications.add(new Notification("新设备分配", "设备Laptop-123已分配给张三", "info"));
        notifications.add(new Notification("设备维修完成", "设备Printer-456维修已完成", "success"));
        notifications.add(new Notification("库存预警", "办公耗材A库存不足，请及时采购", "warning"));
        notifications.add(new Notification("资产盘点提醒", "每周例行盘点将于明天开始", "info"));
        notifications.add(new Notification("系统维护通知", "系统将于本周日凌晨2:00-4:00进行维护", "warning"));
        // 标记一些通知为已读
        notifications.get(2).setRead(true);
        notifications.get(4).setRead(true);
    }

    /**
     * 获取所有通知
     */
    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        return ResponseEntity.ok(notifications);
    }

    /**
     * 将所有通知标记为已读
     */
    @PostMapping("/read_all")
    public ResponseEntity<?> markAllAsRead() {
        notifications.forEach(notification -> notification.setRead(true));
        return ResponseEntity.ok("{\"message\": \"All notifications marked as read\"}");
    }

    /**
     * 将单个通知标记为已读
     */
    @PostMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable String id) {
        Notification notification = notifications.stream()
                .filter(n -> n.getId().equals(id))
                .findFirst()
                .orElse(null);
        
        if (notification == null) {
            return ResponseEntity.status(404).body("{\"message\": \"Notification not found\"}");
        }
        
        notification.setRead(true);
        return ResponseEntity.ok("{\"message\": \"Notification marked as read\"}");
    }

    /**
     * 删除通知
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable String id) {
        boolean removed = notifications.removeIf(n -> n.getId().equals(id));
        if (removed) {
            return ResponseEntity.ok("{\"message\": \"Notification deleted\"}");
        } else {
            return ResponseEntity.status(404).body("{\"message\": \"Notification not found\"}");
        }
    }

    /**
     * 获取未读通知数量
     */
    @GetMapping("/unread/count")
    public ResponseEntity<?> getUnreadCount() {
        long count = notifications.stream().filter(n -> !n.isRead()).count();
        return ResponseEntity.ok("{\"count\": " + count + "}");
    }
}
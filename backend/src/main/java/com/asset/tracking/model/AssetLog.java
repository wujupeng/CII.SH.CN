package com.asset.tracking.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_logs")
@Data
public class AssetLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "assetId", nullable = false)
    private String assetId;
    
    @Column(name = "actionType", nullable = false)
    private String actionType;
    
    @Column(name = "operator")
    private String operator;
    
    @Column(name = "targetDept")
    private String targetDept;
    
    @Column(name = "targetUser")
    private String targetUser;
    
    @Column(name = "locationCode")
    private String locationCode;
    
    @Column(name = "timestamp")
    private LocalDateTime timestamp = LocalDateTime.now();
    
    @Column(name = "remark")
    private String remark;
    
    @ManyToOne
    @JoinColumn(name = "assetId", referencedColumnName = "asset_id", insertable = false, updatable = false)
    private Asset asset;
}
package com.asset.tracking.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "repairs")
@Data
public class Repair {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "assetId", nullable = false)
    private String assetId;
    
    @Column(name = "issue")
    private String issue;
    
    @Column(name = "repairDate")
    private LocalDateTime repairDate;
    
    @Column(name = "result")
    private String result;
    
    @ManyToOne
    @JoinColumn(name = "assetId", referencedColumnName = "asset_id", insertable = false, updatable = false)
    private Asset asset;
}
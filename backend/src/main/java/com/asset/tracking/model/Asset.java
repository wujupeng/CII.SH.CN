package com.asset.tracking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "assets")
@Data
public class Asset {
    @Id
    @Column(name = "asset_id", length = 32, nullable = false)
    private String asset_id;
    
    @Column(name = "name", length = 100, nullable = false)
    private String name;
    
    @Column(name = "model", length = 100)
    private String model;
    
    @Column(name = "category", length = 50)
    private String category;
    
    @Column(name = "purchaseDate")
    private LocalDateTime purchaseDate;
    
    @Column(name = "purchaseDept", length = 50)
    private String purchaseDept;
    
    @Column(name = "status", nullable = false)
    private String status = "in_stock";
    
    @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<AssetLog> logs;
    
    @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Repair> repairs;
}
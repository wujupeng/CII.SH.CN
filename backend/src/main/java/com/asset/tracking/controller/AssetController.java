package com.asset.tracking.controller;

import com.asset.tracking.model.Asset;
import com.asset.tracking.model.AssetLog;
import com.asset.tracking.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/assets")
public class AssetController {
    
    @Autowired
    private AssetService assetService;
    
    @GetMapping
    public ResponseEntity<List<Asset>> list() {
        List<Asset> assets = assetService.findAll();
        return ResponseEntity.ok(assets);
    }
    
    @PostMapping
    public ResponseEntity<Asset> create(@RequestBody Asset asset) {
        Asset createdAsset = assetService.create(asset);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAsset);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        Asset asset = assetService.findById(id);
        if (asset == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Not found\"}");
        }
        return ResponseEntity.ok(asset);
    }
    
    @PostMapping("/{id}/assign")
    public ResponseEntity<?> assign(@PathVariable String id, @RequestBody AssignRequest request) {
        try {
            assetService.assign(id, request.getTargetUser(), request.getTargetDept(), request.getLocationCode(), request.getOperator());
            return ResponseEntity.ok("{\"message\": \"Assigned\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error assigning asset\"}");
        }
    }
    
    @PostMapping("/{id}/repair")
    public ResponseEntity<?> repair(@PathVariable String id, @RequestBody RepairRequest request) {
        try {
            assetService.repair(id, request.getIssue(), request.getRepairDate(), request.getResult());
            return ResponseEntity.ok("{\"message\": \"Repair logged\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error logging repair\"}");
        }
    }
    
    @GetMapping("/{id}/logs")
    public ResponseEntity<List<AssetLog>> logs(@PathVariable String id) {
        List<AssetLog> logs = assetService.getLogs(id);
        return ResponseEntity.ok(logs);
    }
    
    // DTO classes
    public static class AssignRequest {
        private String targetUser;
        private String targetDept;
        private String locationCode;
        private String operator;
        
        // Getters
        public String getTargetUser() { return targetUser; }
        public String getTargetDept() { return targetDept; }
        public String getLocationCode() { return locationCode; }
        public String getOperator() { return operator; }
        
        // Setters
        public void setTargetUser(String targetUser) { this.targetUser = targetUser; }
        public void setTargetDept(String targetDept) { this.targetDept = targetDept; }
        public void setLocationCode(String locationCode) { this.locationCode = locationCode; }
        public void setOperator(String operator) { this.operator = operator; }
    }
    
    public static class RepairRequest {
        private String issue;
        private String repairDate;
        private String result;
        
        // Getters
        public String getIssue() { return issue; }
        public String getRepairDate() { return repairDate; }
        public String getResult() { return result; }
        
        // Setters
        public void setIssue(String issue) { this.issue = issue; }
        public void setRepairDate(String repairDate) { this.repairDate = repairDate; }
        public void setResult(String result) { this.result = result; }
    }
}
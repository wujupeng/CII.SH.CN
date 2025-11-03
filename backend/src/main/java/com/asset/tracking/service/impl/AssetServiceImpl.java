package com.asset.tracking.service.impl;

import com.asset.tracking.model.Asset;
import com.asset.tracking.model.AssetLog;
import com.asset.tracking.model.Repair;
import com.asset.tracking.repository.AssetLogRepository;
import com.asset.tracking.repository.AssetRepository;
import com.asset.tracking.repository.RepairRepository;
import com.asset.tracking.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@Service
public class AssetServiceImpl implements AssetService {
    
    @Autowired
    private AssetRepository assetRepository;
    
    @Autowired
    private AssetLogRepository assetLogRepository;
    
    @Autowired
    private RepairRepository repairRepository;
    
    @Override
    public List<Asset> findAll() {
        return assetRepository.findAll();
    }
    
    @Override
    public Asset findById(String id) {
        Optional<Asset> asset = assetRepository.findById(id);
        return asset.orElse(null);
    }
    
    @Override
    public Asset create(Asset asset) {
        return assetRepository.save(asset);
    }
    
    @Override
    @Transactional
    public void assign(String id, String targetUser, String targetDept, String locationCode, String operator) {
        // Update asset status
        Asset asset = assetRepository.findById(id).orElseThrow(() -> new RuntimeException("Asset not found"));
        asset.setStatus("in_use");
        assetRepository.save(asset);
        
        // Create log
        AssetLog log = new AssetLog();
        log.setAssetId(id);
        log.setActionType("allocated");
        log.setOperator(operator);
        log.setTargetDept(targetDept);
        log.setTargetUser(targetUser);
        log.setLocationCode(locationCode);
        log.setTimestamp(LocalDateTime.now());
        assetLogRepository.save(log);
    }
    
    @Override
    @Transactional
    public void repair(String id, String issue, String repairDateStr, String result) {
        // Update asset status
        Asset asset = assetRepository.findById(id).orElseThrow(() -> new RuntimeException("Asset not found"));
        asset.setStatus("repair");
        assetRepository.save(asset);
        
        // Create repair record
        Repair repair = new Repair();
        repair.setAssetId(id);
        repair.setIssue(issue);
        repair.setResult(result);
        
        // Parse repair date if provided
        if (repairDateStr != null && !repairDateStr.isEmpty()) {
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
                repair.setRepairDate(LocalDateTime.parse(repairDateStr, formatter));
            } catch (DateTimeParseException e) {
                // Use current time if parsing fails
                repair.setRepairDate(LocalDateTime.now());
            }
        } else {
            repair.setRepairDate(LocalDateTime.now());
        }
        
        repairRepository.save(repair);
        
        // Create log
        AssetLog log = new AssetLog();
        log.setAssetId(id);
        log.setActionType("repair");
        log.setRemark(issue);
        log.setTimestamp(LocalDateTime.now());
        assetLogRepository.save(log);
    }
    
    @Override
    public List<AssetLog> getLogs(String id) {
        return assetLogRepository.findByAssetId(id);
    }
}
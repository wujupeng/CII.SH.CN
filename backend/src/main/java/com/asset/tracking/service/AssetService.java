package com.asset.tracking.service;

import com.asset.tracking.model.Asset;
import com.asset.tracking.model.AssetLog;
import java.util.List;

public interface AssetService {
    List<Asset> findAll();
    Asset findById(String id);
    Asset create(Asset asset);
    void assign(String id, String targetUser, String targetDept, String locationCode, String operator);
    void repair(String id, String issue, String repairDate, String result);
    List<AssetLog> getLogs(String id);
}
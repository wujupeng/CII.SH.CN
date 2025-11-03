package com.asset.tracking.repository;

import com.asset.tracking.model.AssetLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssetLogRepository extends JpaRepository<AssetLog, Integer> {
    List<AssetLog> findByAssetId(String assetId);
}
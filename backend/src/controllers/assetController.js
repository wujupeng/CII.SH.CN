const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  list: async (req, res) => {
    const assets = await prisma.asset.findMany();
    res.json(assets);
  },
  create: async (req, res) => {
    const data = req.body;
    // expect asset_id provided or generated on server
    const asset = await prisma.asset.create({ data });
    res.status(201).json(asset);
  },
  getById: async (req, res) => {
    const id = req.params.id;
    const asset = await prisma.asset.findUnique({ where: { asset_id: id } });
    if (!asset) return res.status(404).json({ message: 'Not found' });
    res.json(asset);
  },
  assign: async (req, res) => {
    const id = req.params.id;
    const { targetUser, targetDept, locationCode, operator } = req.body;
    // update status and create log
    await prisma.assetLog.create({ data: {
      assetId: id, actionType: 'allocated', operator, targetDept, targetUser, locationCode
    }});
    await prisma.asset.update({ where: { asset_id: id }, data: { status: 'in_use' }});
    res.json({ message: 'Assigned' });
  },
  repair: async (req, res) => {
    const id = req.params.id;
    const { issue, repairDate, result } = req.body;
    await prisma.repair.create({ data: { assetId: id, issue, repairDate: repairDate || null, result } });
    await prisma.asset.update({ where: { asset_id: id }, data: { status: 'repair' }});
    res.json({ message: 'Repair logged' });
  },
  logs: async (req, res) => {
    const id = req.params.id;
    const logs = await prisma.assetLog.findMany({ where: { assetId: id } });
    res.json(logs);
  }
};
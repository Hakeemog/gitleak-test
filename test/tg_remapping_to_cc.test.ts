// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import TgRemappingToCCService from '../src/services/tg_remapping_to_cc.service';
import { TgRemappingToCCEntity } from '../src/entity/tg_remapping_to_cc.entity';
describe('TgRemappingToCCService', () => {
  let tgRemappingToCCService: TgRemappingToCCService;

  before(() => {
    tgRemappingToCCService = new TgRemappingToCCService();
  });

  after(async () => {
    // await TgRemappingToCCEntity.query(`TRUNCATE TABLE operator_level_entity`);
    await TgRemappingToCCEntity.clear();
  });
  describe('syncDown', () => {
    it('should return an array of TgRemappingToCC', async () => {
      const hub_id = '1';
      const lastSyncTime = '2024-03-12';

      const TgRemappingToCC = await tgRemappingToCCService.downloadTgRemmappingToCC(hub_id, lastSyncTime);
      expect(TgRemappingToCC).to.be.an('array');
    });
  });
});

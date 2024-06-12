// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import TGFieldSizeMappingService from '../src/services/tg-field-size-mapping.service';
import TGFieldSizeMappingEntity from '../src/entity/tg-field-size-mapping.entity';
describe('TgFiledSizeMappingService', () => {
  let TgFiledSizeMappingService: TGFieldSizeMappingService;

  before(() => {
    TgFiledSizeMappingService = new TGFieldSizeMappingService();
  });

  after(async () => {
    // await TgFiledSizeMappingEntity.query(`TRUNCATE TABLE operator_level_entity`);
    await TGFieldSizeMappingEntity.clear();
  });
  describe('syncDownTgFieldSizeMapping', () => {
    it('should return an array of operator level', async () => {
      const lastSyncTime = '0';
      const TgFiledSizeMapping = await TgFiledSizeMappingService.downloadTGFieldSizeMapping(lastSyncTime);
      expect(TgFiledSizeMapping).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up operator level', async () => {
      const TgFiledSizeMapping = [
        {
          ik_number: '222',
          field_size: '2',
        },
      ];

      const updatedData = await TgFiledSizeMappingService.uploadTGFieldSizeMapping(TgFiledSizeMapping as TGFieldSizeMappingEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(TgFiledSizeMapping.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('ik_number');
        expect(data).to.have.property('status');
      });
    });
  });
});

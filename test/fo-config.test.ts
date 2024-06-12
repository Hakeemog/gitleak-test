// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FOConfigService from '../src/services/fo-config.service';
import { FOConfigEntity } from '../src/entity/fo-config.entity';

describe('FoConfigService', () => {
  let foConfigService: FOConfigService;

  before(() => {
    foConfigService = new FOConfigService();
  });

  after(async () => {
    // await FOConfigEntity.query(`TRUNCATE TABLE fo_config_entity`);
    await FOConfigEntity.clear();
  });

  describe('findAllFoConfig', () => {
    it('should return an array of FoConfig', async () => {
      const memberInfo = await foConfigService.findAllFOConfig();
      expect(memberInfo).to.be.an('array');
    });
  });
  describe('syncDownFOConfig', () => {
    it('should return an array of FoConfig', async () => {
      const memberInfo = await foConfigService.syncDownFOConfig('0');
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up FOConfig', async () => {
      const data = [
        {
          id: '2222',
          hub_id: '44',
          screening_cut_off: 0,
          interview_cut_off: 0,
          interview_fallout_rate: 0,
          imei: '333',
          staff_id: '',
          app_version: '',
          operator_id: '8888',
        },
      ];

      const updatedData = await foConfigService.syncUpFOConfig(data as FOConfigEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(data.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

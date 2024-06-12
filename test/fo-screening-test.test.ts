// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FOScreeningTestService from '../src/services/fo-screening-test.service';
import { FOScreeningTestEntity } from '../src/entity/fo-screening-test.entity';
describe('FoScreeningTestService', () => {
  let FoScreeningTestService: FOScreeningTestService;

  before(() => {
    FoScreeningTestService = new FOScreeningTestService();
  });

  after(async () => {
    // await FoScreeningTestEntity.query(`TRUNCATE TABLE deactivation_reason_entity`);
    await FOScreeningTestEntity.clear();
  });

  describe('downloadFoScreeningTest', () => {
    it('should return an array of FoScreeningTest', async () => {
      const lastSyncTime = '0';
      const memberInfo = await FoScreeningTestService.syncDownFOScreeningTest(lastSyncTime);
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up FoScreeningTest', async () => {
      const FoScreeningTest = [
        {
          id: 'ST1001',
          hub_id: 'HUB123',
          questions: 'Comma-separated list of question IDs',
          duration: 60, // Duration in minutes
          cut_off_mark: 70,
          cut_off_adjusted_flag: 0,
          status: 'Active',
          level: 'Intermediate',
          date_setup: '2023-01-10',
          imei: 'IMEI1234567890',
          staff_id: 'S1001',
          app_version: '1.2.3',
          operator_id: 'OP123',
        },
      ];

      const updatedData = await FoScreeningTestService.syncUpFOScreeningTest(FoScreeningTest as FOScreeningTestEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(FoScreeningTest.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

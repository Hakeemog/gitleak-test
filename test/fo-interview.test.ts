// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FOInterviewService from '../src/services/fo-interview.service';
import { FOInterviewEntity } from '../src/entity/fo-interview.entity';

describe('FoInterviewService', () => {
  let FoInterviewService: FOInterviewService;

  before(() => {
    FoInterviewService = new FOInterviewService();
  });

  after(async () => {
    // await FoInterviewEntity.query(`TRUNCATE TABLE deactivation_reason_entity`);
    await FOInterviewEntity.clear();
  });

  describe('downloadFoInterview', () => {
    it('should return an array of FoInterview', async () => {
      const lastSyncTime = '0';
      const operator_id = 'T-100000000';
      const memberInfo = await FoInterviewService.syncDownFOInterviewList(lastSyncTime, operator_id);
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up FoInterview', async () => {
      const FoInterview = [
        {
          id: 'I1001',
          screening_test_id: 'ST1001',
          cut_off_mark: 70,
          cut_off_adjusted_flag: 0,
          status: 'Completed',
          imei: 'IMEI1234567890',
          staff_id: 'S1001',
          app_version: '1.2.3',
          operator_id: 'OP123',
        },
        {
          id: 'I1002',
          screening_test_id: 'ST1002',
          cut_off_mark: 65,
          cut_off_adjusted_flag: 0,
          status: 'In Progress',
          imei: 'IMEI9876543210',
          staff_id: 'S1002',
          app_version: '1.2.4',
          operator_id: 'OP124',
        },
      ];

      const updatedData = await FoInterviewService.updateFOInterviewList(FoInterview as FOInterviewEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(FoInterview.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

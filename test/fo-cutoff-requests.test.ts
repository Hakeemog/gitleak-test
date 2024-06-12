// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FOCutoffRequestService from '../src/services/fo-cutoff-requests.service';
import { FoCutoffRequestsEntity } from '../src/entity/fo-cutoff-requests.entity';

describe('FoCutoffRequestService', () => {
  let FoCutoffRequestService: FOCutoffRequestService;

  before(() => {
    FoCutoffRequestService = new FOCutoffRequestService();
  });

  after(async () => {
    await FoCutoffRequestsEntity.clear();
  });

  describe('downloadFoCutoffRequest', () => {
    it('should return an array of downloadDeactivation Reason', async () => {
      const lastSyncTime = '0';
      const hub_id = '1';

      const memberInfo = await FoCutoffRequestService.syncDownFoCutoffRequestsList(lastSyncTime, hub_id);
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up downloadDeactivation Reason', async () => {
      const FoCutoffRequest = [
        {
          id: '22',
          screening_test_id: '01',
          hub_id: '1',
          current_cutoff: 50,
          recommended_cutoff: 70,
          proposed_cutoff: 70,
          reason: 'passed',
          approval_status: '1',
          request_type: 'string',
          date_logged: '2024-02-24',
          imei: '44444',
          staff_id: 'T-1000000000001105',
          app_version: '3.0',
        },
      ];

      const updatedData = await FoCutoffRequestService.updateFoCutoffRequestsList(FoCutoffRequest as FoCutoffRequestsEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(FoCutoffRequest.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

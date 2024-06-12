// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import DeactivationReasonService from '../src/services/deactivation-reason.service';
import DeactivationReasonEntity from '../src/entity/deactivation-reason.entity';

describe('deactivationReasonService', () => {
  let deactivationReasonService: DeactivationReasonService;

  before(() => {
    deactivationReasonService = new DeactivationReasonService();
  });

  after(async () => {
    // await DeactivationReasonEntity.query(`TRUNCATE TABLE deactivation_reason_entity`);
    await DeactivationReasonEntity.clear();
  });

  describe('downloadDeactivationReason', () => {
    it('should return an array of downloadDeactivation Reason', async () => {
      const memberInfo = await deactivationReasonService.downloadDeactivationReason('0', '1');
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up downloadDeactivation Reason', async () => {
      const deactivationReason = [
        {
          unique_member_id: 'string',
          reason: '',
          comment: '',
          date_recorded: '',
          staff_id: '',
          hub_id: '',
          imei: '',
          operator_id: '',
          app_version: '',
        },
      ];

      const updatedData = await deactivationReasonService.uploadDeactivationReason(deactivationReason as DeactivationReasonEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(deactivationReason.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('unique_member_id');
        expect(data).to.have.property('status');
      });
    });
  });
});

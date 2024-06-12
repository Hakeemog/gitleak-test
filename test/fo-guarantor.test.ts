// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FOGuarantorService from '../src/services/fo-guarantor.service';
import { FOGuarantorTable } from '../src/entity/fo-guarantor.entity';

describe('FoGuarantorService', () => {
  let FoGuarantorService: FOGuarantorService;

  before(() => {
    FoGuarantorService = new FOGuarantorService();
  });

  after(async () => {
    // await FoGuarantorEntity.query(`TRUNCATE TABLE deactivation_reason_entity`);
    await FOGuarantorTable.clear();
  });

  describe('downloadFoGuarantor', () => {
    it('should return an array of downloadDeactivation Reason', async () => {
      const lastSyncTime = '0';
      const operator_id = 'T-1C0000000';
      const hub_id = '1';
      const entity_id = '1';

      const memberInfo = await FoGuarantorService.syncDownFOGuarantor(lastSyncTime, operator_id, hub_id, entity_id);
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up downloadDeactivation Reason', async () => {
      const FoGuarantor = [
        {
          id: '123',
          fo_id: '456',
          first_name: 'John',
          last_name: 'Doe',
          mobile: '1234567890',
          profession: 'Software Engineer',
          facial_template: 'Real facial template data',
          position: 'Senior Developer',
          address: '123 Main Street',
          latitude: '40.7128',
          longitude: '-74.0060',
          address_verified: 'Yes',
          verification_video: 'https://example.com/verification.mp4',
          business_name: 'ABC Company',
          business_address: '456 Business Avenue',
          relationship_to_applicant: 'Manager',
          incorrect_information: 'No',
          comments: 'Additional comments here',
          lga: 'Local Government Area',
          ward: 'Ward',
          community: 'Community',
          imei: 'IMEI1234567890',
          staff_id: '789',
          app_version: '1.0.0',
          hub_id: '101',
          operator_id: '202',
        },
      ];

      const updatedData = await FoGuarantorService.syncUpFOGuarantor(FoGuarantor as FOGuarantorTable[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(FoGuarantor.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

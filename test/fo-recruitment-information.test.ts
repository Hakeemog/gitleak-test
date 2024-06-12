// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FORecruitmentInformationService from '../src/services/fo-recruitment-information.service';
import { FORecruitmentInformationEntity } from '../src/entity/fo-recruitment-information.entity';

describe('FoRecruitmentInformationService', () => {
  let FoRecruitmentInformationService: FORecruitmentInformationService;

  before(() => {
    FoRecruitmentInformationService = new FORecruitmentInformationService();
  });

  after(async () => {
    // await FoRecruitmentInformationEntity.query(`TRUNCATE TABLE deactivation_reason_entity`);
    await FORecruitmentInformationEntity.clear();
  });

  describe('downloadFoRecruitmentInformation', () => {
    it('should return an array of FoRecruitmentInformation', async () => {
      const lastSyncTime = '0';
      const operator_id = 'T-1C0000000';
      const hub_id = '1';
      const entity_id = '1';

      const memberInfo = await FoRecruitmentInformationService.syncDownFORecruitmentInformation(lastSyncTime, operator_id, hub_id, entity_id);
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up FoRecruitmentInformation', async () => {
      const FoRecruitmentInformation = [
        {
          id: 'RI1001',
          staff_id: 'S1001',
          hub_id: 'HUB123',
          test_date: '2023-01-15',
          test_start_time: '09:00 AM',
          location_name: 'Example Test Center',
          location_address: '123 Main Street',
          landmark: 'Near City Hall',
          community_name: 'Community A',
          contact_number: '9876543210',
          item_to_bring: 'Pen, Paper',
          organisation_name: 'Example Organization',
          other_information: 'Please arrive 30 minutes early',
          imei: 'IMEI1234567890',
          app_version: '1.2.3',
          operator_id: 'OP123',
        },
      ];

      const updatedData = await FoRecruitmentInformationService.syncUpFORecruitmentInformation(
        FoRecruitmentInformation as FORecruitmentInformationEntity[],
      );
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(FoRecruitmentInformation.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

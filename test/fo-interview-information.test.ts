// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FOInterviewInformationService from '../src/services/fo-interview-information.service';
import { FOInterviewInformationEntity } from '../src/entity/fo-interview-information.entity';

describe('FoInterviewInformationService', () => {
  let FoInterviewInformationService: FOInterviewInformationService;

  before(() => {
    FoInterviewInformationService = new FOInterviewInformationService();
  });

  after(async () => {
    // await FoInterviewInformationEntity.query(`TRUNCATE TABLE deactivation_reason_entity`);
    await FOInterviewInformationEntity.clear();
  });

  describe('downloadFoInterviewInformation', () => {
    it('should return an array of download FO Interview Information', async () => {
      const lastSyncTime = '0';
      const entity_id = '1';
      const memberInfo = await FoInterviewInformationService.syncDownFOInterviewInformation(lastSyncTime, entity_id);
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up FO Interview Information', async () => {
      const FoInterviewInformation = [
        {
          id: '1001',
          staff_id: 'S1001',
          operator_id: 'OP123',
          hub_id: 'HUB123',
          interview_date: '2023-02-15',
          interview_start_time: '09:00 AM',
          location_name: 'Example Interview Center',
          location_address: '456 High Street',
          landmark: 'Near Central Park',
          community_name: 'Community C',
          contact_number: '0987654321',
          item_to_bring: 'Resume, ID Proof',
          organisation_name: 'Example Company',
          other_information: 'Please arrive 15 minutes early',
          imei: 'IMEI1234567890',
          app_version: '1.2.3',
          candidate_id: 'C1001',
          interview_type: 'Face-to-Face',
          meeting_link: 'https://example.com/meeting',
          interviewer_id: 'INTV123',
        },
      ];

      const updatedData = await FoInterviewInformationService.syncUpFOInterviewInformation(FoInterviewInformation as FOInterviewInformationEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(FoInterviewInformation.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

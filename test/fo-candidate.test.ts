// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FOCandidateService from '../src/services/fo-candidate.service';
import { FOCandidateEntity } from '../src/entity/fo-candidate.entity';
describe('FoCandidateService', () => {
  let FoCandidateService: FOCandidateService;

  before(() => {
    FoCandidateService = new FOCandidateService();
  });

  after(async () => {
    // await FoCandidateEntity.query(`TRUNCATE TABLE deactivation_reason_entity`);
    await FOCandidateEntity.clear();
  });

  describe('downloadFoCandidate', () => {
    it('should return an array of downloadDeactivation Reason', async () => {
      const lastSyncTime = '0';
      const operator_id = 'T-1C0000000';
      const hub_id = '1';
      const staff_id = 'T-1C00000';
      const entity_id = '1';
      const memberInfo = await FoCandidateService.syncDownFOCandidate(lastSyncTime, operator_id, hub_id, staff_id, entity_id);
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up downloadDeactivation Reason', async () => {
      const FoCandidate = [
        {
          id: '12345',
          hub_id: 'hub123',
          first_name: 'John',
          last_name: 'Doe',
          mobile: '1234567890',
          email: 'john.doe@example.com',
          screening_answers: 'Some screening answers',
          interview_marks: '90',
          qualification: 'Bachelor of Science in Computer Science',
          facial_template: 'Facial template data',
          screening_test_id: 'test123',
          is_notified: 1,
          screening_score: 80,
          screening_test_status: 'Passed',
          screening_date: '2024-02-28',
          department: 'Engineering',
          interview_score: 85,
          interview_status: 'Scheduled',
          interview_date: '2024-03-05',
          imei: 'IMEI1234567890',
          activation_date: '2024-03-01',
          offer_signed_flag: 1,
          staff_id: 'staff123',
          app_version: '1.2.3',
          operator_id: 'operator123',
          country: 'United States',
          approval_status: 'Approved',
          fo_id: 'fo123',
          lga: 'Some LGA',
          ward: 'Some Ward',
          community: 'Some Community',
        },
      ];

      const updatedData = await FoCandidateService.syncUpFOCandidate(FoCandidate as FOCandidateEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(FoCandidate.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

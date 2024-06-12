// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FOInterviewerService from '../src/services/fo-interviewer.service';
import { FOInterviewerEntity } from '../src/entity/fo-interviewer.entity';

describe('FoInterviewerService', () => {
  let FoInterviewerService: FOInterviewerService;

  before(() => {
    FoInterviewerService = new FOInterviewerService();
  });

  after(async () => {
    // await FoInterviewerEntity.query(`TRUNCATE TABLE deactivation_reason_entity`);
    await FOInterviewerEntity.clear();
  });

  describe('downloadFoInterviewer', () => {
    it('should return an array of FoInterviewer', async () => {
      const lastSyncTime = '0';
      const memberInfo = await FoInterviewerService.syncDownFOInterviewerList(lastSyncTime);
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up FoInterviewer', async () => {
      const FoInterviewer = [
        {
          id: 'string',
          first_name: 'string',
          last_name: 'string',
          mobile: 'string',
          email: 'string',
          qualification: 'string',
          facial_template: 'string',
          screening_test_id: 'string',
          screening_score: 0,
          screening_test_status: 'string',
          screening_date: 'string',
          department: 'string',
          interview_score: 0,
          interview_status: 'string',
          interview_date: 'string',
          screening_answers: 'string',
          interview_marks: 'string',
          imei: 'string',
          staff_id: 'string',
          app_version: 'string',
        },
      ];

      const updatedData = await FoInterviewerService.updateFOInterviewerList(FoInterviewer as FOInterviewerEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(FoInterviewer.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

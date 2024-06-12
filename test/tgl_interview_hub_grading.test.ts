// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import TGLInterviewHubGradingEntity from '../src/entity/tgl_interview_hub_grading.entity';
import TGLInterviewHubGradingService from '../src/services/tgl_interview_hub_grading.service';

describe('TglInterviewHubGradingService', () => {
  let TglInterviewHubGradingService: TGLInterviewHubGradingService;

  before(() => {
    TglInterviewHubGradingService = new TGLInterviewHubGradingService();
  });

  after(async () => {
    // await TglInterviewHubGradingEntity.query(`TRUNCATE TABLE operator_level_entity`);
    await TGLInterviewHubGradingEntity.clear();
  });
  describe('syncDown', () => {
    it('should return an array of operator level', async () => {
      const last_sync_time = '0';
      const entity_id = '1';
      const TglInterviewHubGrading = await TglInterviewHubGradingService.downloadTGLInterviewHubGrading(last_sync_time, entity_id);
      expect(TglInterviewHubGrading).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up operator level', async () => {
      const TglInterviewHubGrading = [
        {
          hub_id: 0,
          hub_name: '7',
          proceed_flag: 0,
          pass_test_score: 0,
          pass_interview_score: 0,
        },
      ];

      const updatedData = await TglInterviewHubGradingService.uploadTGLInterviewHubGrading(TglInterviewHubGrading as TGLInterviewHubGradingEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(TglInterviewHubGrading.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('hub_id');
        expect(data).to.have.property('status');
      });
    });
  });
});

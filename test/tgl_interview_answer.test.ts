// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import TGLInterviewAnswerEntity from '../src/entity/tgl_interview_answer.entity';
import TGLInterviewAnswerService from '../src/services/tgl_interview_answer.service';

describe('TglInterviewAnswerService', () => {
  let TglInterviewAnswerService: TGLInterviewAnswerService;

  before(() => {
    TglInterviewAnswerService = new TGLInterviewAnswerService();
  });

  after(async () => {
    // await TglInterviewAnswerEntity.query(`TRUNCATE TABLE operator_level_entity`);
    await TGLInterviewAnswerEntity.clear();
  });
  describe('syncDown', () => {
    it('should return an array of TglInterviewAnswer', async () => {
      const last_sync_time = '0';
      const entity_id = '1';
      const TglInterviewAnswer = await TglInterviewAnswerService.downloadTGLInterviewAnswer(last_sync_time, entity_id);
      expect(TglInterviewAnswer).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up TglInterviewAnswer', async () => {
      const TglInterviewAnswer = [
        {
          tgl_registration_id: 'REG123',
          question_id: 'Q123',
          option_id: 'O456',
          correct_flag: 1,
          hub_id: 'HUB123',
          hub_name: 'Example Hub',
          staff_id: 'STAFF123',
          operator_id: 'OPERATOR789',
          imei: 'IMEI1234567890',
          app_version: '1.2.3',
          delete_flag: 0,
          question_type: 'Multiple Choice',
          scored_point: 1,
        },
      ];

      const updatedData = await TglInterviewAnswerService.uploadTGLInterviewAnswer(TglInterviewAnswer as unknown as TGLInterviewAnswerEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(TglInterviewAnswer.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('tgl_registration_id');
        expect(data).to.have.property('status');
      });
    });
  });
});

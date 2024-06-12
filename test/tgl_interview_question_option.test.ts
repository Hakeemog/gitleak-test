// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import TGLInterviewQuestionOptionEntity from '../src/entity/tgl_interview_question_option.entity';
import TGLInterviewQuestionOptionService from '../src/services/tgl_interview_question_option.service';
describe('TglInterviewQuestionOptionService', () => {
  let TglInterviewQuestionOptionService: TGLInterviewQuestionOptionService;

  before(() => {
    TglInterviewQuestionOptionService = new TGLInterviewQuestionOptionService();
  });

  after(async () => {
    // await TglInterviewQuestionOptionEntity.query(`TRUNCATE TABLE operator_level_entity`);
    await TGLInterviewQuestionOptionEntity.clear();
  });
  describe('syncDown', () => {
    it('should return an array of TglInterviewQuestionOption', async () => {
      const last_sync_time = '0';
      const entity_id = '1';
      const TglInterviewQuestionOption = await TglInterviewQuestionOptionService.downloadTGLInterviewQuestionOption(last_sync_time, entity_id);
      expect(TglInterviewQuestionOption).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up TglInterviewQuestionOption', async () => {
      const TglInterviewQuestionOption = [
        {
          id: '22233',
          question_id: 'sample_id',
          option: 'options',
          point: 0,
          order: 0,
          delete_flag: 0,
        },
      ];

      const updatedData = await TglInterviewQuestionOptionService.uploadTGLInterviewQuestionOption(
        TglInterviewQuestionOption as TGLInterviewQuestionOptionEntity[],
      );
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(TglInterviewQuestionOption.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import TGLInterviewQuestionEntity from '../src/entity/tgl_interview_question.entity';
import TGLInterviewQuestionService from '../src/services/tgl_interview_question.service';

describe('TglInterviewQuestionService', () => {
  let TglInterviewQuestionService: TGLInterviewQuestionService;

  before(() => {
    TglInterviewQuestionService = new TGLInterviewQuestionService();
  });

  after(async () => {
    // await TglInterviewQuestionEntity.query(`TRUNCATE TABLE operator_level_entity`);
    await TGLInterviewQuestionEntity.clear();
  });
  describe('syncDown', () => {
    it('should return an array of TglInterviewQuestion', async () => {
      const last_sync_time = '0';
      const entity_id = '1';
      const TglInterviewQuestion = await TglInterviewQuestionService.downloadTGLInterviewQuestion(last_sync_time, entity_id);
      expect(TglInterviewQuestion).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up TglInterviewQuestion', async () => {
      const TglInterviewQuestion = [
        {
          id: 'Q1001',
          question: 'What is your previous experience in entrepreneurship?',
          question_type: 'Open-ended',
          point: 0,
          language: 'English',
          order: 1,
          media_id: '',
          next_question_id: 'Q1002',
          question_modal: 'Normal',
          delete_flag: 0,
        },
        {
          id: 'Q1002',
          question: 'How would you handle challenges in running a business?',
          question_type: 'Open-ended',
          point: 0,
          language: 'English',
          order: 2,
          media_id: '',
          next_question_id: 'Q1003',
          question_modal: 'Normal',
          delete_flag: 0,
        },
      ];

      const updatedData = await TglInterviewQuestionService.uploadTGLInterviewQuestion(TglInterviewQuestion as TGLInterviewQuestionEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(TglInterviewQuestion.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

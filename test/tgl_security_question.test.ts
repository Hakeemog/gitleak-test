import 'reflect-metadata';
import { expect } from 'chai';
import TGLSecurityQuestionEntity from '../src/entity/tgl_security_question.entity';
import TGLSecurityQuestionService from '../src/services/tgl_security_question.service';
describe('TglSecurityQuestionService', () => {
  let TglSecurityQuestionService: TGLSecurityQuestionService;

  before(() => {
    TglSecurityQuestionService = new TGLSecurityQuestionService();
  });

  after(async () => {
    // await TglSecurityQuestionEntity.query(`TRUNCATE TABLE operator_level_entity`);
    await TGLSecurityQuestionEntity.clear();
  });
  describe('syncDown', () => {
    it('should return an array of TglSecurityQuestion', async () => {
      const last_sync_time = '0';
      const entity_id = '1';
      const TglSecurityQuestion = await TglSecurityQuestionService.downloadTGLSecurityQuestion(last_sync_time, entity_id);
      expect(TglSecurityQuestion).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up TglSecurityQuestion', async () => {
      const TglSecurityQuestion = [
        {
          id: 'SQ1001',
          question: "What is your mother's maiden name?",
          delete_flag: 0,
        },
        {
          id: 'SQ1002',
          question: 'What city were you born in?',
          delete_flag: 0,
        },
        {
          id: 'SQ1003',
          question: 'What is your favorite movie?',
          delete_flag: 0,
        },
      ];

      const updatedData = await TglSecurityQuestionService.uploadTGLSecurityQuestion(TglSecurityQuestion as TGLSecurityQuestionEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(TglSecurityQuestion.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

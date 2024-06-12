// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FOScreeningQuestionService from '../src/services/fo-sreening-question.service';
import { FOScreeningQuestionEntity } from '../src/entity/fo-screening-question.entity';
import { FOScreeningQuestionDto } from '../src/dtos/fo-screening-question.dto';
describe('FoScreeningQuestionService', () => {
  let FoScreeningQuestionService: FOScreeningQuestionService;

  before(() => {
    FoScreeningQuestionService = new FOScreeningQuestionService();
  });

  after(async () => {
    // await FoScreeningQuestionEntity.query(`TRUNCATE TABLE deactivation_reason_entity`);
    // await FOScreeningQuestionEntity.clear();
  });

  describe('downloadFoScreeningQuestion', () => {
    it('should return an array of FoScreeningQuestion', async () => {
      const lastSyncTime = '0';
      const entity_id = '1';
      const memberInfo = await FoScreeningQuestionService.syncDownFOScreeningQuestion(lastSyncTime, entity_id);
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up FoScreeningQuestion', async () => {
      const FoScreeningQuestion = [
        {
          question_id: 'Q1001',
          question: 'What is 2 + 2?',
          answer: '4',
          options: '1,2,3,4',
          question_category_id: 'QC1001',
          deactivate: 0,
          options_image_names: '',
        },
        {
          question_id: 'Q1002',
          question: 'What is the capital of France?',
          answer: 'Paris',
          options: 'London,Berlin,Madrid,Paris',
          question_category_id: 'QC1002',
          deactivate: 0,
          options_image_names: '',
        },
      ];

      const updatedData = await FoScreeningQuestionService.syncUpFOScreeningQuestion(FoScreeningQuestion as FOScreeningQuestionDto[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(FoScreeningQuestion.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('question_id');
        expect(data).to.have.property('status');
      });
    });
  });
});

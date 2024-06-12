// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FOInterviewQuestionsService from '../src/services/fo-interview-questions.service';
import { FOInterviewQuestionsEntity } from '../src/entity/fo-interview-question.entity';

describe('FoInterviewQuestionsService', () => {
  let FoInterviewQuestionsService: FOInterviewQuestionsService;

  before(() => {
    FoInterviewQuestionsService = new FOInterviewQuestionsService();
  });

  after(async () => {
    // await FoInterviewQuestionsEntity.query(`TRUNCATE TABLE deactivation_reason_entity`);
    await FOInterviewQuestionsEntity.clear();
  });

  describe('downloadFoInterviewQuestions', () => {
    it('should return an array of FoInterviewQuestions', async () => {
      const lastSyncTime = '0';

      const memberInfo = await FoInterviewQuestionsService.syncDownFoInterviewQuestionsList(lastSyncTime);
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up FoInterviewQuestions', async () => {
      const FoInterviewQuestions = [
        {
          id: 'Q1001',
          question: 'What is your experience in sales?',
          department: 'Sales',
          answer_guide: 'Candidate should mention previous sales roles and achievements.',
          maximum_mark: 10,
          deactivate: 0,
          category: 'Experience',
          score: '7/10',
          language: 'English',
        },
        {
          id: 'Q1002',
          question: 'How do you handle challenging situations?',
          department: 'All',
          answer_guide: 'Candidate should provide examples of past experiences and problem-solving skills.',
          maximum_mark: 8,
          deactivate: 0,
          category: 'Behavioral',
          score: '6/8',
          language: 'English',
        },
      ];

      const updatedData = await FoInterviewQuestionsService.updateFoInterviewQuestionsList(FoInterviewQuestions as FOInterviewQuestionsEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(FoInterviewQuestions.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FOInterviewAnswerService from '../src/services/fo-interview-answer.service';
import { FOInterviewAnswerEntity } from '../src/entity/fo-interview-answer.entity';
describe('FoInterviewAnswerService', () => {
  let FoInterviewAnswerService: FOInterviewAnswerService;

  before(() => {
    FoInterviewAnswerService = new FOInterviewAnswerService();
  });

  after(async () => {
    // await FoInterviewAnswerEntity.query(`TRUNCATE TABLE deactivation_reason_entity`);
    await FOInterviewAnswerEntity.clear();
  });

  describe('downloadFoInterviewAnswer', () => {
    it('should return an array of download FO interview Answer', async () => {
      const lastSyncTime = '0';

      const memberInfo = await FoInterviewAnswerService.syncDownFoInterviewAnswerList(lastSyncTime);
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up download FO Interview Answer', async () => {
      const FoInterviewAnswer = [
        {
          id: 'string',
          question_id: 'string',
          answer: 'string',
          score: 'string',
        },
      ];

      const updatedData = await FoInterviewAnswerService.updateFoInterviewAnswerList(FoInterviewAnswer as FOInterviewAnswerEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(FoInterviewAnswer.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

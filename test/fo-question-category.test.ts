// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FOQuestionCategoryService from '../src/services/fo-question-category.service';
import { FOQuestionCategoryEntity } from '../src/entity/fo-question-category.entity';
import { FOQuestionCategoryDto } from '../src/dtos/fo-question-category.dto';

describe('FoQuestionCategoryService', () => {
  let FoQuestionCategoryService: FOQuestionCategoryService;

  before(() => {
    FoQuestionCategoryService = new FOQuestionCategoryService();
  });

  after(async () => {
    // await FoQuestionCategoryEntity.query(`TRUNCATE TABLE deactivation_reason_entity`);
    await FOQuestionCategoryEntity.clear();
  });

  describe('downloadFoQuestionCategory', () => {
    it('should return an array of FoQuestionCategory', async () => {
      const lastSyncTime = '0';
      const entity_id = '1';
      const memberInfo = await FoQuestionCategoryService.syncDownFOQuestionCategory(lastSyncTime, entity_id);
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up FoQuestionCategory', async () => {
      const FoQuestionCategory = [
        {
          question_category_id: 'QC1001',
          name: 'Sales',
          description: 'Questions related to sales skills and experience.',
          difficulty: 'Medium',
        },
        {
          question_category_id: 'QC1002',
          name: 'Customer Service',
          description: 'Questions related to customer service experience and skills.',
          difficulty: 'Easy',
        },
      ];

      const updatedData = await FoQuestionCategoryService.syncUpFOQuestionCategory(FoQuestionCategory as FOQuestionCategoryDto[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(FoQuestionCategory.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('question_category_id');
        expect(data).to.have.property('status');
      });
    });
  });
});

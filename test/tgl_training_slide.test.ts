import 'reflect-metadata';
import { expect } from 'chai';
import TGLTrainingSlideEntity from '../src/entity/tgl_training_slide.entity';
import TGLTrainingSlideService from '../src/services/tgl_training_slide.service';

describe('TglTrainingSlideService', () => {
  let TglTrainingSlideService: TGLTrainingSlideService;

  before(() => {
    TglTrainingSlideService = new TGLTrainingSlideService();
  });

  after(async () => {
    // await TglTrainingSlideEntity.query(`TRUNCATE TABLE operator_level_entity`);
    await TGLTrainingSlideEntity.clear();
  });
  describe('syncDown', () => {
    it('should return an array of TglTrainingSlide', async () => {
      const last_sync_time = '0';
      const entity_id = '1';
      const TglTrainingSlide = await TglTrainingSlideService.downloadTGLTrainingSlide(last_sync_time, entity_id);
      expect(TglTrainingSlide).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up TglTrainingSlide', async () => {
      const TglTrainingSlide = [
        {
          id: 'TS1001',
          name: 'Introduction to Entrepreneurship',
          description: 'Overview of basic concepts and principles of entrepreneurship.',
          media_id: 'media_intro_001',
          media_lang: 'English',
          page_number: 1,
          delete_flag: 0,
        },
        {
          id: 'TS1002',
          name: 'Business Planning',
          description: 'Guidelines for creating a comprehensive business plan.',
          media_id: 'media_biz_plan_001',
          media_lang: 'English',
          page_number: 2,
          delete_flag: 0,
        },
      ];

      const updatedData = await TglTrainingSlideService.uploadTGLTrainingSlide(TglTrainingSlide as TGLTrainingSlideEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(TglTrainingSlide.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

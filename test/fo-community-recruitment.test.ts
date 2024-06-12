// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';

import FOCommunityRecruitmentService from '../src/services/fo-community-recruitment.service';
import FOCommunityRecruitmentEntity from '../src/entity/fo-community-recruitment.entity';

describe('foCommunityRecruitmentService', () => {
  let foCommunityRecruitmentService: FOCommunityRecruitmentService;

  before(() => {
    foCommunityRecruitmentService = new FOCommunityRecruitmentService();
  });

  after(async () => {
    // await FOCommunityRecruitmentEntity.query(`TRUNCATE TABLE fo_community_recruitment_entity`);
    await FOCommunityRecruitmentEntity.clear();
  });

  describe('downloadFoCommunityRecruitment', () => {
    it('should return an array of download FOCommunity Recruitment', async () => {
      const memberInfo = await foCommunityRecruitmentService.downloadFOCommunityRecruitment('0', '1');
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up FOCommunity Recruitment', async () => {
      const data = [
        {
          imei: 'string',
          assigned_staff_id: 'string',
          community_id: 'string',
          start_date: 'string',
          recruitment_status: 'string',
          completion_date: 'string',
          app_version: 'string',
          staff_id: '',
        },
      ];

      const updatedData = await foCommunityRecruitmentService.uploadFOCommunityRecruitment(data as unknown as FOCommunityRecruitmentEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(data.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('assigned_staff_id');
        expect(data).to.have.property('status');
      });
    });
  });
});

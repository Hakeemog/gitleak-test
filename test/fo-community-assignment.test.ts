// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FOCommunityAssignmentService from '../src/services/fo-community-assignment.service';
import FOCommunityAssignmentEntity from '../src/entity/fo-community-assignment.entity';

describe('FOCommunityAssignmentService', () => {
  let foCommunityAssignmentService: FOCommunityAssignmentService;

  before(() => {
    foCommunityAssignmentService = new FOCommunityAssignmentService();
  });

  after(async () => {
    // await FOCommunityAssignmentEntity.query(`TRUNCATE TABLE fo_community_assignment_entity`);
    await FOCommunityAssignmentEntity.clear();
  });

  describe('downloadFOCommunityAssignment', () => {
    it('should return an array of download FOCommunity Assignment', async () => {
      const memberInfo = await foCommunityAssignmentService.downloadFOCommunityAssignment('0', '1');
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up FOCommunity Assignment', async () => {
      const data = [
        {
          imei: '',
          hub_id: '',
          assigned_staff_id: '',
          community_id: '',
          assigned_staff_name: '',
          delete_flag: 0,
          date_assigned: '',
          app_version: '',
          staff_id: '',
        },
      ];

      const updatedData = await foCommunityAssignmentService.uploadFOCommunityAssignment(data as FOCommunityAssignmentEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(data.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('assigned_staff_id');
        expect(data).to.have.property('status');
      });
    });
  });
});

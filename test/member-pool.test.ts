// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import { PlanningService } from '../src/services/planning.service';
import MemberPoolService from '../src/services/member-pool.service';
import { MemberPoolDto } from '../src/dtos/member-pool.dto';
import { MemberPoolEntity } from '../src/entity/member-pool.entity';
import EntityAssignmentService from '../src/services/entity_assignment.service';

class PlanningTestService extends PlanningService {
  constructor() {
    super();
  }

  async getUserFromPlanning(staff_id: string): Promise<any> {
    const data = {
      id: `${staff_id}`,
      role: 'BGO',
      operator_id: 'IK00127864_0000',
      entity_id: '10',
      hub: {
        id: 14,
      },
    };

    return data;
  }
}

//Test
describe('memberPoolService', () => {
  let planningService: PlanningTestService;
  let entityAssignmentService: EntityAssignmentService;
  let memberPoolService: MemberPoolService;

  before(() => {
    planningService = new PlanningTestService();
    entityAssignmentService = new EntityAssignmentService(planningService);
    memberPoolService = new MemberPoolService(planningService, entityAssignmentService);
  });

  after(async () => {
    // await MemberPoolEntity.query(`TRUNCATE TABLE member_pool_entity`);
    await MemberPoolEntity.clear();
  });

  // describe('syncDownMemberPool', () => {
  //   it('should return an array of member pool', async () => {
  //     const memberInfo = await memberPoolService.downloadMemberPool('0', 'IK00127864_0000');
  //     expect(memberInfo).to.be.an('array');
  //   });
  // });
  // describe('getTrustGroupCount', () => {
  //   it('should return an array of ik_numbers', async () => {
  //     const memberInfo = await memberPoolService.getTrustApprovedMembersCount('IK00127864_0000');
  //     expect(memberInfo).to.be.above(-1);
  //   });
  // });

  describe('uploadMemberPool', () => {
    it('should sync up Member Pool', async () => {
      const data = [
        {
          unique_member_id: 'hTGE-23393939',
          ik_number: 'IK00000222',
          unique_ik_number: 'IK00000222',
          approval_flag: 0,
          first_name: 'test',
          last_name: 'test',
          lock_flag: 0,
          approved_operator_id: '',
          locked_operator_id: '',
          date_approved: '',
          date_locked: '',
          assigned_operator_id: '',
          assigned_tge_id: '',
          assigned_fo_id: '',
          verified_flag: '',
          app_version: '',
          lock_imei: '',
          approval_imei: '',
        },
      ];

      const updatedData = await memberPoolService.uploadMemberPool(data as unknown as MemberPoolDto[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(data.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('unique_member_id');
        expect(data).to.have.property('status');
      });
    });
  });
});

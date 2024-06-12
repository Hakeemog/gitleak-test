// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import MasterAssignmentService from '../src/services/master_assignment.service';
import MasterAssignmentEntity from '../src/entity/master_assignment.entity';
import { PlanningService } from '../src/services/planning.service';

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
describe('masterAssignmentService', () => {
  let planningService: PlanningTestService;
  let masterAssignmentService: MasterAssignmentService;

  before(() => {
    planningService = new PlanningTestService();
    masterAssignmentService = new MasterAssignmentService(planningService);
  });

  after(async () => {
    // await MasterAssignmentEntity.query(`TRUNCATE TABLE master_assignment_entity`);
    await MasterAssignmentEntity.clear();
  });

  describe('findAllMasterAssignment', () => {
    it('should return an array of Master Assignment', async () => {
      const memberInfo = await masterAssignmentService.findAllMasterAssignment();
      expect(memberInfo).to.be.an('array');
    });
  });
  describe('syncDownMasterAssignment', () => {
    it('should return an array of Master Assignment', async () => {
      const memberInfo = await masterAssignmentService.syncDownMasterAssignment('0', 'IK00127864_0000', '4');
      expect(memberInfo).to.be.an('array');
    });
  });
  describe('getTrustGroups', () => {
    it('should return an array of ik_numbers', async () => {
      const memberInfo = await masterAssignmentService.getTrustGroups('IK00127864_0000');
      expect(memberInfo).to.be.an('array');
    });
  });
  describe('getStaffAssignment', () => {
    it('should return an array of staff ids', async () => {
      const memberInfo = await masterAssignmentService.getStaffAssignment('IK00127864_0000');
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUpMasterAssignment', () => {
    it('should sync up Master Assignment', async () => {
      const data = [
        {
          ik_number: '',
          hub_id: '',
          ofo_id: 0,
          tge_id: 0,
          operator_id: '',
        },
      ];

      const updatedData = await masterAssignmentService.syncUpMasterAssignment(data as unknown as MasterAssignmentEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(data.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('ik_number');
        expect(data).to.have.property('status');
      });
    });
  });
});

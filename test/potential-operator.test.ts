// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import PotentialOperatorService from '../src/services/potential-operator.service';
import PotentialOperatorEntity from '../src/entity/potential-operator.entity';
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
describe('PotentialOperator', () => {
  let planningService: PlanningTestService;
  let potentialOperatorService: PotentialOperatorService;

  before(() => {
    planningService = new PlanningTestService();
    potentialOperatorService = new PotentialOperatorService(planningService);
  });

  after(async () => {
    // await PotentialOperatorEntity.query(`TRUNCATE TABLE potential_operator_entity`);
    await PotentialOperatorEntity.clear();
  });

  describe('syncDown', () => {
    it('should return an array of users', async () => {
      const memberInfo = await potentialOperatorService.synchronizeDown('0', 'IK00127864_0000', '4');
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up potential Operators', async () => {
      const potentialOperator = [
        {
          unique_member_id: '3339999_333',
          interested_flag: 'string',
          staff_id: 'string',
          hub_id: 'string',
          operator_id: 'string',
          imei: 'string',
          app_version: 'string',
          interview_date: 'string',
          reason: 'string',
        },
      ];

      const updatedData = await potentialOperatorService.synchronizeUp(potentialOperator as PotentialOperatorEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(potentialOperator.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('unique_member_id');
        expect(data).to.have.property('status');
      });
    });
  });
});

// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import EntrepreneurLevelService from '../src/services/entrepreneur-level.service';
import EntrepreneurLevelEntity from '../src/entity/entrepreneur-level.entity';
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
describe('EntrepreneurLevelService', () => {
  let planningService: PlanningTestService;
  let entrepreneurLevelService: EntrepreneurLevelService;

  before(() => {
    planningService = new PlanningTestService();
    entrepreneurLevelService = new EntrepreneurLevelService(planningService);
  });

  after(async () => {
    // await EntrepreneurLevelEntity.query(`TRUNCATE TABLE entrepreneur_level_entity`);
    await EntrepreneurLevelEntity.clear();
  });

  describe('syncDown', () => {
    it('should return an array of users', async () => {
      const memberInfo = await entrepreneurLevelService.synchronizeDown('0', 'T-10000', '4');
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up member info', async () => {
      const memberInfo = [
        {
          unique_member_id: '222',
          ik_number: '33333',
          operator_id: 'Yes',
          level: 3,
        },
      ];

      const updatedData = await entrepreneurLevelService.synchronizeUp(memberInfo as EntrepreneurLevelEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(memberInfo.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('unique_member_id');
        expect(data).to.have.property('status', 1);
      });
    });
  });
});

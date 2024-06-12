// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import { PlanningService } from '../src/services/planning.service';
import EligibleTGLPromotionService from '../src/services/eligible-tgl-promotion.service';
import EligibleTGLPromotionEntity from '../src/entity/eligible-tgl-promotion.entity';
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
describe('EligibleTglPromotionService', () => {
  let planningService: PlanningTestService;
  let eligibleTglPromotionService: EligibleTGLPromotionService;

  before(() => {
    planningService = new PlanningTestService();
    eligibleTglPromotionService = new EligibleTGLPromotionService(planningService);
  });

  after(async () => {
    // await EligibleTGLPromotionEntity.query(`TRUNCATE TABLE eligible_tgl_promotion_entity`);
    await EligibleTGLPromotionEntity.clear();
  });

  describe('syncDown', () => {
    it('should return an array of eligible tgl', async () => {
      const eligibleTgl = await eligibleTglPromotionService.synchronizeDown('0', 'T-10000', '4');
      expect(eligibleTgl).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up eligible tgl', async () => {
      const eligibleTgl = [
        {
          unique_member_id: '222',
          ik_number: '33333',
          operator_id: 'Yes',
          has_book_interview: '0',
        },
      ];

      const updatedData = await eligibleTglPromotionService.synchronizeUp(eligibleTgl as EligibleTGLPromotionEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(eligibleTgl.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('unique_member_id');
        expect(data).to.have.property('status', 1);
      });
    });
  });
});

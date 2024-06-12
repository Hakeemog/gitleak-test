// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import OperatorLevelService from '../src/services/operator-level.service';
import OperatorLevelEntity from '../src/entity/operator-level.entity';

describe('OperatorLevelService', () => {
  let operatorLevelService: OperatorLevelService;

  before(() => {
    operatorLevelService = new OperatorLevelService();
  });

  after(async () => {
    // await OperatorLevelEntity.query(`TRUNCATE TABLE operator_level_entity`);
    await OperatorLevelEntity.clear();
  });
  describe('syncDown', () => {
    it('should return an array of operator level', async () => {
      const operatorLevel = await operatorLevelService.synchronizeDown('T-10000', '4');
      expect(operatorLevel).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up operator level', async () => {
      const operatorLevel = [
        {
          staff_id: '222',
          level_name: 'Level 3',
          level: 3,
        },
      ];

      const updatedData = await operatorLevelService.synchronizeUp(operatorLevel as OperatorLevelEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(operatorLevel.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('staff_id');
        expect(data).to.have.property('status', 1);
      });
    });
  });
});

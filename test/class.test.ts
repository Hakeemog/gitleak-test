import 'reflect-metadata';
import { expect } from 'chai';
import ClassService from '../src/services/class.service';
import ClassInterface from '../src/interfaces/class.interface';
import ClassEntity from '../src/entity/class.entity';

//test
describe('ClassService', () => {
  let classService: ClassService;

  before(() => {
    classService = new ClassService();
  });

  after(async () => {
    // await ClassEntity.query(`TRUNCATE TABLE class_entity;`);
    await ClassEntity.clear();
  });

  describe('syncDown', () => {
    // Should be able to synchronize down classes based on last sync time and hub id
    it('should synchronize down classes based on last sync time and hub id', async () => {
      const lastSyncTime = '0';
      const hubId = '1234';

      const classes = await classService.synchronizeDown(lastSyncTime, hubId);
      expect(classes).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    // Should be able to synchronize up classes and return success message
    it('Should be able to synchronize up classes and return success message', async () => {
      const classes: ClassInterface[] = [
        {
          class_id: '1',
          date: '2021-01-01',
          title: 'Class 1',
          time: '09:00',
          location: 'Location 1',
          trainee_category: 'Category 1',
          trainer_staff_id: '123',
          status: 'Active',
          test_required_flag: 0,
          date_created: '2021-01-01T00:00:00.000Z',
          staff_id: '456',
          hub_id: '12345',
          imei: '789',
          app_version: '1.0',
          delete_flag: 0,
        },
        {
          class_id: '2',
          date: '2021-01-02',
          title: 'Class 2',
          time: '10:00',
          location: 'Location 2',
          trainee_category: 'Category 2',
          trainer_staff_id: '456',
          status: 'Active',
          test_required_flag: 0,
          date_created: '2021-01-02T00:00:00.000Z',
          staff_id: '789',
          hub_id: '12345',
          imei: '012',
          app_version: '2.0',
          delete_flag: 0,
        },
      ];

      const updatedData = await classService.synchronizeUp(classes as ClassEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(classes.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('class_id');
        expect(data).to.have.property('status', 1);
      });
    });
  });
});

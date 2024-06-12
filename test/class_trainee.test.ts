// import necessary dependencies
import 'reflect-metadata';
import { expect } from 'chai';
import ClassTraineeService from '../src/services/class_trainee.service';
import ClassTraineeEntity from '../src/entity/class_trainee.entity';
import ClassTraineeInterface from '../src/interfaces/class_trainee.interface';
import { before } from 'mocha';

describe('ClassTrainerService', () => {
  let classTraineeService: ClassTraineeService;

  before(() => {
    classTraineeService = new ClassTraineeService();
  });

  after(async () => {
    await ClassTraineeEntity.clear();
  });

  describe('syncDown', () => {
    // Should be able to synchronize down trainees based on last sync time and hub id
    it('should synchronize down trainees based on last sync time and hub id', async () => {
      const lastSyncTime = '0';
      const hubId = '123456';

      const trainees = await classTraineeService.synchronizeDown(lastSyncTime, hubId);
      expect(trainees).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    // Should be able to synchronize up trainees and return status and message for each trainee
    it('should synchronize up trainees and return status and message for each trainee', async () => {
      const trainees: ClassTraineeInterface[] = [
        {
          class_id: '1',
          trainee_staff_id: '123',
          name: 'John Doe',
          role: 'Trainee',
          location: 'Location 1',
          attendance_flag: 0,
          delete_flag: 0,
          date_added: '2021-01-01',
          staff_id: '456',
          hub_id: '123456',
          imei: '789',
          app_version: '1.0.0',
          test_taken_flag: 0,
        },
        {
          class_id: '2',
          trainee_staff_id: '456',
          name: 'Jane Smith',
          role: 'Trainee',
          location: 'Location 2',
          attendance_flag: 0,
          delete_flag: 0,
          date_added: '2021-01-02',
          staff_id: '789',
          hub_id: '123456',
          imei: '012',
          app_version: '2.0.0',
          test_taken_flag: 0,
        },
      ];

      const updatedData = await classTraineeService.synchronizeUp(trainees as ClassTraineeEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(trainees.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('class_id');
        expect(data).to.have.property('trainee_staff_id');
        expect(data).to.have.property('status', 1);
      });
    });
  });
});

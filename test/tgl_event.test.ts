// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import TGLEventEntity from '../src/entity/tgl_event.entity';
import TGLEventService from '../src/services/tgl_event.service';
describe('TglEventService', () => {
  let tglEventService: TGLEventService;

  before(() => {
    tglEventService = new TGLEventService();
  });

  after(async () => {
    // await TglEventEntity.query(`TRUNCATE TABLE operator_level_entity`);
    await TGLEventEntity.clear();
  });
  describe('syncDown', () => {
    it('should return an array of operator level', async () => {
      const lastSyncTime = '0';
      const entity_id = '1';
      const TglEvent = await tglEventService.downloadTGLEvent(lastSyncTime, entity_id);
      expect(TglEvent).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up operator level', async () => {
      const TglEvent = [
        {
          id: 'E1001',
          number_of_entrepreneurs: 50,
          number_of_tgls: 5,
          event_date: '2023-07-20',
          group_image_name: 'event_group_photo.jpg',
          feedback_image_name: 'feedback_form.jpg',
          feedback_comment: 'The event was a great success!',
          hub_id: 'HUB456',
          hub_name: 'Example Hub',
          staff_id: 'STAFF123',
          operator_id: 'OPERATOR789',
          imei: 'IMEI1234567890',
          app_version: '1.2.3',
          delete_flag: 0,
        },
      ];

      const updatedData = await tglEventService.uploadTGLEvent(TglEvent as unknown as TGLEventEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(TglEvent.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

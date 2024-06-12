// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import TGLRegistrationEntity from '../src/entity/tgl_registration.entity';
import TGLRegistrationService from '../src/services/tgl_registration.service';

describe('TglRegistrationService', () => {
  let TglRegistrationService: TGLRegistrationService;

  before(() => {
    TglRegistrationService = new TGLRegistrationService();
  });

  after(async () => {
    // await TglRegistrationEntity.query(`TRUNCATE TABLE operator_level_entity`);
    await TGLRegistrationEntity.clear();
  });
  describe('syncDown', () => {
    it('should return an array of TglRegistration', async () => {
      const last_sync_time = '0';
      const entity_id = '1';
      const hub_id = 1;
      const TglRegistration = await TglRegistrationService.downloadTGLRegistration(last_sync_time, entity_id, hub_id);
      expect(TglRegistration).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up TglRegistration', async () => {
      const TglRegistration = [
        {
          id: 'REG123',
          first_name: 'John',
          last_name: 'Doe',
          gender: 'Male',
          date_of_birth: '1990-05-20',
          phone_number: '1234567890',
          is_phone_number_verified: 1,
          bvn: '1234567890',
          lga_id: 123,
          ward_id: 456,
          community_id: 789,
          address: '123 Main Street',
          program: 'Entrepreneurship',
          field_size: 5,
          ik_number: 'IK123',
          registration_date: '2023-08-15',
          previous_bg_member_flag: 0,
          previous_ik_number: '',
          id_card_flag: 1,
          id_card_type: 'National ID',
          id_card_expiry_date: '2024-05-20',
          id_card_facial_match_flag: 1,
          facial_template: 'Facial template data',
          referee_tge_ik_number: 'TGE456',
          referee_tge_name: 'Jane Smith',
          referee_tge_product: 'Product A',
          referee_tge_season: 'Season 2023',
          image_name: 'registration_photo.jpg',
          id_card_name: 'national_id_card.jpg',
          video_name: 'registration_video.mp4',
          feedback_image_name: 'feedback_photo.jpg',
          feedback_comment: 'Good registration experience.',
          hub_id: 123,
          hub_name: 'Example Hub',
          staff_id: 'STAFF123',
          operator_id: 'OPERATOR789',
          imei: 'IMEI1234567890',
          app_version: '1.2.3',
          delete_flag: 0,
          network_name: 'Example Network',
          network_connection: '4G',
          interview_date: '2023-09-01',
          interview_score: 80,
          pass_interview_flag: 1,
          unique_member_id: 'UNIQUE123',
          test_score: 90,
          consistency_score: 85,
          pass_rate_score: 75,
          cca_phone_status: 'Active',
          cca_feedback_comment: 'Positive feedback from CCA.',
          cca_feedback_image_name: 'cca_feedback_photo.jpg',
          latitude: '40.7128',
          longitude: '-74.0060',
        },
      ];

      const updatedData = await TglRegistrationService.uploadTGLRegistration(TglRegistration as TGLRegistrationEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(TglRegistration.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import TGLVoucherMappingEntity from '../src/entity/tgl_voucher_mapping.entity';
import TGLVoucherMappingService from '../src/services/tgl_voucher_mapping.service';
describe('TglVoucherMappingService', () => {
  let TglVoucherMappingService: TGLVoucherMappingService;

  before(() => {
    TglVoucherMappingService = new TGLVoucherMappingService();
  });

  after(async () => {
    // await TglVoucherMappingEntity.query(`TRUNCATE TABLE operator_level_entity`);
    await TGLVoucherMappingEntity.clear();
  });
  describe('syncDown', () => {
    it('should return an array of TglVoucherMapping', async () => {
      const last_sync_time = '0';
      const entity_id = '1';
      const TglVoucherMapping = await TglVoucherMappingService.downloadTGLVoucherMapping(last_sync_time, entity_id);
      expect(TglVoucherMapping).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up TglVoucherMapping', async () => {
      const TglVoucherMapping = [
        {
          voucher_id: 'VCH123',
          tge_ik_number: 'TGE456',
          link_date: '2023-10-01',
          feedback_image_name: 'feedback_voucher.jpg',
          feedback_comment: 'Voucher linked successfully.',
          hub_id: 123,
          hub_name: 'Example Hub',
          staff_id: 'STAFF123',
          operator_id: 'OPERATOR789',
          imei: 'IMEI1234567890',
          app_version: '1.2.3',
          delete_flag: 0,
          tge_first_name: 'Jane',
          tge_last_name: 'Smith',
          voucher_ik_numbers: 'IK123,IK456,IK789',
        },
      ];

      const updatedData = await TglVoucherMappingService.uploadTGLVoucherMapping(TglVoucherMapping as TGLVoucherMappingEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(TglVoucherMapping.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('voucher_id');
        expect(data).to.have.property('status');
      });
    });
  });
});

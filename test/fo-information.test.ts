// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import FOInformationService from '../src/services/fo-information.service';
import { FOInformationTable } from '../src/entity/fo-information.entity';
describe('FoInformationService', () => {
  let FoInformationService: FOInformationService;

  before(() => {
    FoInformationService = new FOInformationService();
  });

  after(async () => {
    // await FoInformationEntity.query(`TRUNCATE TABLE deactivation_reason_entity`);
    await FOInformationTable.clear();
  });

  describe('downloadFoInformation', () => {
    it('should return an array of downloadFoInformation Reason', async () => {
      const lastSyncTime = '0';
      const operator_id = 'T-1C0000000';
      const hub_id = '1';

      const memberInfo = await FoInformationService.syncDownFOInformation(lastSyncTime, operator_id, hub_id);
      expect(memberInfo).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up downloadFoInformation', async () => {
      const FoInformation = [
        {
          candidate_id: '1001',
          staff_id: 'S1001',
          first_name: 'John',
          last_name: 'Doe',
          date_of_birth: '1985-07-15',
          hub_id: 'HUB123',
          salary: '50000',
          email: 'john.doe@example.com',
          gender: 'Male',
          is_notified: 1,
          marital_status: 'Married',
          department: 'Sales',
          role: 'Field Officer',
          manager: 'Jane Smith',
          ward: 'Ward A',
          community: 'Community B',
          mobile: '1234567890',
          means_of_id: 'Driver’s License',
          start_date: '2023-01-15',
          end_date: '2023-12-31',
          id_number: 'DL123456',
          address: '123 Main Street',
          latitude: '40.7128',
          longitude: '-74.0060',
          address_verified: 'Yes',
          account_number: '1234567890',
          bank_name: 'Example Bank',
          guarantor_verified_status: 'Verified',
          community_head_verified_status: 'Verified',
          community_head_comment: 'All good',
          imei: 'IMEI1234567890',
          fo_id: 'FO123',
          app_version: '1.2.3',
          operator_id: 'OP123',
          active_flag: 1,
          nin: '1234567890',
        },
      ];

      const updatedData = await FoInformationService.syncUpFOInformation(FoInformation as FOInformationTable[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(FoInformation.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('status');
      });
    });
  });
});

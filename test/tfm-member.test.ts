// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import TFMMemberService from '../src/services/tfm-member.service';
import { MembersEntity } from '../src/entity/members.entity';
import { TFMMembersDto } from '../src/dtos/tfm-member.dto';
describe('TfmMemberService', () => {
  let TfmMemberService: TFMMemberService;

  before(() => {
    TfmMemberService = new TFMMemberService();
  });

  after(async () => {
    // await TfmMemberEntity.query(`TRUNCATE TABLE operator_level_entity`);
    await MembersEntity.clear();
  });
  describe('syncDownTfmMembers', () => {
    it('should return an array of Tfm members', async () => {
      const lastSyncTime = '0';
      const operator_id = 'T-1C000000';
      const hub_id = '1';
      const staff_id = 'T-1C000000';
      const TfmMember = await TfmMemberService.downloadTFMMember(lastSyncTime, operator_id, hub_id, staff_id);
      expect(TfmMember).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up operator level', async () => {
      const TfmMember = [
        {
          unique_member_id: 'string',
          ik_number: 'string',
          member_id: 'string',
          first_name: 'string',
          middle_name: 'string',
          last_name: 'string',
          phone_number: 'string',
          date_of_birth: 'string',
          sex: 'string',
          primary_product: 'string',
          state_id: 'string',
          lga_id: 'string',
          ward_id: 'string',
          community_id: 'string',
          community_name: 'string',
          address: 'string',
          role: 'string',
          template: 'string',
          reg_date: 'string',
          deactivate_flag: 'string',
          enrollment_flag: 'string',
          delete_flag: 'string',
          staff_id: 'string',
          hub_id: 'string',
          pass_verification: 'string',
          latitude: 0,
          longitude: 0,
          field_size: 'string',
          id_card_flag: 'string',
          name_on_id_card: 'string',
          bvn: 'string',
          prepaid_card_details: 'string',
          card_number: 'string',
          card_type: 'string',
          season: 'string',
          imei: 'string',
          app_version: 'string',
          season_year: 'string',
          reactivation_date: 'string',
          enrollment_date: 'string',
        },
      ];

      const updatedData = await TfmMemberService.uploadTFMMember(TfmMember as TFMMembersDto[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(TfmMember.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('unique_member_id');
        expect(data).to.have.property('status', 1);
      });
    });
  });
});

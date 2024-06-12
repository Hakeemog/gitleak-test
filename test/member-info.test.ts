// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import MemberInfoService from '../src/services/member-info.service';
import MemberInfoEntity from '../src/entity/member-info.entity';

describe('MemberInfoService', () => {
  let memberInfoService: MemberInfoService;

  before(() => {
    memberInfoService = new MemberInfoService();
  });

  after(async () => {
    // await MemberInfoEntity.query(`TRUNCATE TABLE member_info_entity`);
    await MemberInfoEntity.clear();
  });

  describe('syncDown', () => {
    it('should return an array of users', async () => {
      const users = await memberInfoService.synchronizeDown('0', '4');
      expect(users).to.be.an('array');
    });
  });

  describe('syncUp', () => {
    it('should sync up member info', async () => {
      const memberInfo = [
        {
          unique_member_id: '222',
          nin: '33333',
          can_receive_call_from_home: 'Yes',
          call_network: 'mtn',
          second_phone_number: '080333333333',
          third_phone_number: '09044444444',
          have_home_flag: '1',
          disability_flag: '0',
          educational_level: '6',
          receiving_income_flag: '1',
          source_of_income: '2',
          participated_in_agric_programs: 'BG',
          participated_organization_name: 'BG',
          share_info_terms_flag: '1',
          share_info_term_reason: '',
          id_card_name: 'BG',
        },
      ];

      const updatedData = await memberInfoService.synchronizeUp(memberInfo as MemberInfoEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(memberInfo.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('unique_member_id');
        expect(data).to.have.property('status', 1);
      });
    });
  });
});

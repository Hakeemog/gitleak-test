// Import necessary dependencies and the UserService
import 'reflect-metadata';
import { expect } from 'chai';
import { TGSponsorshipEntity } from '../src/entity/tg-sponsorship.entity';
import TGSponsorshipService from '../src/services/clearance-tg-sponsorship.service';
describe('TgSponsorshipService', () => {
  let tgSponsorshipService: TGSponsorshipService;

  before(() => {
    tgSponsorshipService = new TGSponsorshipService();
  });

  after(async () => {
    await TGSponsorshipEntity.clear();
  });
  // describe('syncDown', () => {
  //   it('should return an array of tg sponsorship', async () => {
  //     const TgSponsorship = await tgSponsorshipService.syncDownTGSponsorshipList('T-10000', '4');
  //     expect(TgSponsorship).to.be.an('array');
  //   });
  // });

  describe('syncUp', () => {
    it('should sync up operator level', async () => {
      const TgSponsorship = [
        {
          tg_id: 'TG123',
          assigned_tge_id: 'TGE456',
          sponsor_id: 'SP789',
        },
      ];

      const updatedData = await tgSponsorshipService.updateTGSponsorshipList(TgSponsorship as TGSponsorshipEntity[]);
      expect(updatedData).to.be.an('array');
      expect(updatedData).to.have.lengthOf(TgSponsorship.length);
      updatedData.forEach(data => {
        expect(data).to.have.property('tg_id');
        expect(data).to.have.property('status');
      });
    });
  });
});

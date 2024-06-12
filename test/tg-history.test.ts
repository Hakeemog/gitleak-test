// // Import necessary dependencies and the UserService
// import 'reflect-metadata';
// import { expect } from 'chai';
// import TGHistoryEntity from '../src/entity/tg-history.entity';
// import TGHistoryService from '../src/services/tg-history.service';
// describe('TgHistoryService', () => {
//   let tgHistoryService: TGHistoryService;

//   before(() => {
//     tgHistoryService = new TGHistoryService();
//   });

//   after(async () => {
//     await TGHistoryEntity.clear();
//   });
//   describe('syncDown', () => {
//     it('should return an array of TgHistory', async () => {
//       const TgHistory = await tgHistoryService.downloadTGHistory('T-10000', '4');
//       expect(TgHistory).to.be.an('array');
//     });
//   });

//   describe('syncUp', () => {
//     it('should sync up operator level', async () => {
//       const TgHistory = [
//         {
//           ik_number: 'IK123',
//           year: '2023',
//           ha_size: 'Medium',
//           tg_leader_id: 'TL1001',
//           contractual_meet_date: '2023-05-15',
//           hub_id: 'HUB123',
//           financial_meet_flag: 1,
//         },
//       ];
//       const updatedData = await tgHistoryService.uploadTGHistory(TgHistory as TGHistoryEntity[]);
//       expect(updatedData).to.be.an('array');
//       expect(updatedData).to.have.lengthOf(TgHistory.length);
//       updatedData.forEach(data => {
//         expect(data).to.have.property('ik_number');
//         expect(data).to.have.property('status', 1);
//       });
//     });
//   });
// });

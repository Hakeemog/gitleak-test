// // Import necessary dependencies and the UserService
// import 'reflect-metadata';
// import { expect } from 'chai';
// import FOProspectCandidateNumberService from '../src/services/fo-prospect-candidate.number.service';
// import { FOProspectCandidateNumberEntity } from '../src/entity/fo-prospect-candidate-number.entity';

// describe('FoProspectCandidateNumberService', () => {
//   let FoProspectCandidateNumberService: FOProspectCandidateNumberService;

//   before(() => {
//     FoProspectCandidateNumberService = new FOProspectCandidateNumberService();
//   });

//   after(async () => {
//     await FOProspectCandidateNumberEntity.clear();
//   });

//   describe('downloadFoProspectCandidateNumber', () => {
//     it('should return an array of downloadDeactivation Reason', async () => {
//       const memberInfo = await FoProspectCandidateNumberService.('0', '1');
//       expect(memberInfo).to.be.an('array');
//     });
//   });

//   describe('syncUp', () => {
//     it('should sync up downloadDeactivation Reason', async () => {
//       const FoProspectCandidateNumber = [
//         {
//           name: 'string',
//           mobile: 0,
//           hub_id: 0,
//           season: 'string',
//           year: 0,
//         },
//       ];

//       const updatedData = await FoprospectCandidateNumberService.uploadFoprospectCandidateNumber(
//         FoprospectCandidateNumber as FoprospectCandidateNumberEntity[],
//       );
//       expect(updatedData).to.be.an('array');
//       expect(updatedData).to.have.lengthOf(FoprospectCandidateNumber.length);
//       updatedData.forEach(data => {
//         expect(data).to.have.property('unique_member_id');
//         expect(data).to.have.property('status');
//       });
//     });
//   });
// });

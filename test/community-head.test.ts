// import 'reflect-metadata';
// import { expect } from 'chai';
// import CommunityHeadService from '../src/services/community-head.service';
// import CommunityHeadEntity from '../src/entity/community-head.entity';
// import CommunityHead from '../src/interfaces/community-head.interface';

// describe('communityHeadService', () => {
//   let communityHeadService: CommunityHeadService;

//   before(() => {
//     communityHeadService = new CommunityHeadService();
//   });

//   // after(async () => {
//   //   // await CommunityHeadEntity.query(`TRUNCATE TABLE community_head_entity`);
//   //   // await CommunityHeadEntity.clear();
//   // });

//   describe('syncDown', () => {
//     // Successfully download community head data
//     it('should successfully download community head data when last sync time and hub ID are provided', async () => {
//       const lastSyncTime = '0';
//       const hubId = '12345';

//       const downloadables = await communityHeadService.downloadCommunityHead(lastSyncTime, hubId);
//       expect(downloadables).to.be.an('array');
//     });
//   });

//   describe('syncUp', () => {
//     // Successfully upload community head data
//     it('should successfully upload community head data when data is provided', async () => {
//       const communityHeadData: CommunityHead[] = [
//         {
//           id: '1',
//           first_name: 'John',
//           last_name: 'Doe',
//           email: 'john.doe@example.com',
//           mobile: '1234567890',
//           address: '123 Main St',
//           facial_template: 'template',
//           community_id: 'community1',
//           imei: '1234567890',
//           staff_id: 'staff1',
//           app_version: '1.0',
//           hub_id: 'hub1',
//           created_at: new Date(),
//           updated_at: new Date(),
//         },
//       ];

//       const updatedData = await communityHeadService.uploadCommunityHead(communityHeadData as CommunityHeadEntity[]);
//       expect(updatedData).to.be.an('array');
//       expect(updatedData).to.have.lengthOf(communityHeadData.length);
//       updatedData.forEach(data => {
//         expect(data).to.have.property('id');
//         expect(data).to.have.property('status', 1);
//       });
//     });
//   });
// });

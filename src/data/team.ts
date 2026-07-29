import drSameer from '../assets/dr-sameer-varma-opd.jpeg';
import drRjk from '../assets/dr-rjk-opd.jpeg';
import drAditya from '../assets/dr-aditya-bhardwaj.jpeg';

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  image?: string;
  extension?: string;
  specialty?: string;
  code?: string;
}

export const MEDICAL_SPECIALISTS: TeamMember[] = [
  {
    id: 'dr-sameer-varma',
    name: 'Dr. Sameer Varma',
    designation: 'Founder & Senior Eye Specialist',
    department: 'Ophthalmology',
    image: drSameer,
    specialty: 'Cataract, Glaucoma, Oculoplasty & Paediatric Cataract',
  },
  {
    id: 'dr-rjk-singh',
    name: 'Dr. R.J.K. Singh',
    designation: 'Senior Consultant Ophthalmologist',
    department: 'Ophthalmology',
    image: drRjk,
    specialty: 'Comprehensive Ophthalmology',
  },
  {
    id: 'dr-aditya-bhardwaj',
    name: 'Dr. Maj Aditya Bhardwaj',
    designation: 'Vitreo-Retinal & Cataract Surgeon',
    department: 'Retina',
    image: drAditya,
    specialty: 'Vitreoretinal Surgery, Medical Retina & Cataract',
  },
];

export const SUPPORT_TEAM: TeamMember[] = [
  {
    id: 'emp-01',
    code: '01',
    name: 'Vinod Kumar',
    designation: 'Counsellor Manager',
    department: 'Administration',
    image: '/staff/card_01.jpg'
  },
  {
    id: 'emp-02',
    code: '02',
    name: 'Ashutosh Asthana',
    designation: 'Optical Manager',
    department: 'Optical & Pharmacy',
    image: '/staff/card_02.jpg'
  },
  {
    id: 'emp-03',
    code: '03',
    name: 'Suresh Nagila',
    designation: 'Account Manager',
    department: 'Administration',
    image: '/staff/card_03.jpg'
  },
  {
    id: 'emp-04',
    code: '04',
    name: 'Deepak Chandra Paneru',
    designation: 'Admin Incharge',
    department: 'Administration',
    image: '/staff/card_04.jpg'
  },
  {
    id: 'emp-05',
    code: '05',
    name: 'Bhagwan Ram',
    designation: 'OT Runner',
    department: 'Clinical Support',
    image: '/staff/card_05.jpg'
  },
  {
    id: 'emp-06',
    code: '06',
    name: 'Inder Rawat',
    designation: 'OT Assistant',
    department: 'Clinical Support',
    image: '/staff/card_06.jpg'
  },
  {
    id: 'emp-07',
    code: '07',
    name: 'Kavita Kargeti',
    designation: 'OT Technician',
    department: 'Clinical Support',
    image: '/staff/card_07.jpg'
  },
  {
    id: 'emp-08',
    code: '08',
    name: 'Krishna Chandra',
    designation: 'Maintenance Manager',
    department: 'Administration',
    image: '/staff/card_08.jpg'
  },
  {
    id: 'emp-09',
    code: '09',
    name: 'Prakash Sharma',
    designation: 'Clinical Manager',
    department: 'Administration',
    image: '/staff/card_09.jpg'
  },
  {
    id: 'emp-10',
    code: '10',
    name: 'Geeta Negi',
    designation: 'Billing Executive',
    department: 'Front Office & Billing',
    image: '/staff/card_10.jpg'
  },
  {
    id: 'emp-11',
    code: '11',
    name: 'Mamta Mehra',
    designation: 'Nurse',
    department: 'Clinical Support',
    image: '/staff/card_11.jpg'
  },
  {
    id: 'emp-12',
    code: '12',
    name: 'Hemlata',
    designation: 'PRO',
    department: 'Front Office & Billing',
    image: '/staff/card_12.jpg'
  },
  {
    id: 'emp-13',
    code: '13',
    name: 'Dinesh Chandra',
    designation: 'PRO',
    department: 'Front Office & Billing',
    image: '/staff/card_13.jpg'
  },
  {
    id: 'emp-14',
    code: '14',
    name: 'Mahendra Kumar',
    designation: 'Billing Executive',
    department: 'Front Office & Billing',
    image: '/staff/card_14.jpg'
  },
  {
    id: 'emp-15',
    code: '15',
    name: 'Kajal Sharma',
    designation: 'Receptionist',
    department: 'Front Office & Billing',
    image: '/staff/card_15.jpg'
  },
  {
    id: 'emp-16',
    code: '16',
    name: 'Deepak Chandra',
    designation: 'Security Guard',
    department: 'Support Services',
    image: '/staff/card_16.jpg'
  },
  {
    id: 'emp-17',
    code: '17',
    name: 'Rakesh Kumar',
    designation: 'Driver',
    department: 'Support Services',
    image: '/staff/card_17.jpg'
  },
  {
    id: 'emp-18',
    code: '18',
    name: 'Alok Dwivedi',
    designation: 'Senior Optometrist',
    department: 'Clinical Support',
    image: '/staff/card_18.jpg'
  },
  {
    id: 'emp-19',
    code: '19',
    name: 'Noor Saba',
    designation: 'Pharmacy Executive',
    department: 'Optical & Pharmacy',
    image: '/staff/card_19.jpg'
  },
  {
    id: 'emp-20',
    code: '20',
    name: 'Sumit Singh Rana',
    designation: 'Marketing Executive',
    department: 'Marketing',
    image: '/staff/card_20.jpg'
  },
  {
    id: 'emp-21',
    code: '21',
    name: 'Kamlesh Mazila',
    designation: 'Senior Optometrist',
    department: 'Clinical Support',
    image: '/staff/card_21.jpg'
  },
  {
    id: 'emp-22',
    code: '22',
    name: 'Nikhil Nayal',
    designation: 'Optical Executive',
    department: 'Optical & Pharmacy',
    image: '/staff/card_22.jpg'
  },
  {
    id: 'emp-23',
    code: '23',
    name: 'Divyam Arya',
    designation: 'Sales Executive',
    department: 'Optical & Pharmacy',
    image: '/staff/card_23.jpg'
  },
  {
    id: 'emp-24',
    code: '24',
    name: 'Manisha Arya',
    designation: 'Fitter',
    department: 'Optical & Pharmacy',
    image: '/staff/card_24.jpg'
  },
  {
    id: 'emp-25',
    code: '25',
    name: 'Dheeraj Tripathi',
    designation: 'Pharmacist',
    department: 'Optical & Pharmacy',
    image: '/staff/card_25.jpg'
  },
  {
    id: 'emp-26',
    code: '26',
    name: 'Bhuvan Singh',
    designation: 'Guard',
    department: 'Support Services',
    image: '/staff/card_26.jpg'
  }
];

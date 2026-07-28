import drSameer from '../assets/dr-sameer-varma-opd.jpeg';
import drRjk from '../assets/dr-rjk-opd.jpeg';
import drAditya from '../assets/dr-aditya-bhardwaj.jpeg';

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  /** Department chip, e.g. "Administration", "Optometry". Chips on the Team page are derived from these. */
  department: string;
  /** Photo or ID-card image. Optional — the card falls back to initials. */
  image?: string;
  /** Internal extension, shown on the card's call button. Optional. */
  extension?: string;
  /** Short line under the name on specialist cards. */
  specialty?: string;
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

/**
 * Support & administrative staff.
 *
 * Left empty deliberately: these are real employees, and their names, designations
 * and extension numbers must come from the clinic rather than be guessed at. Add
 * entries here and they appear on the Team page automatically — the department
 * filter chips are derived from whatever `department` values are present.
 *
 * Example:
 *   { id: 'vinod-kumar', name: 'Vinod Kumar', designation: 'Counselling Manager',
 *     department: 'Administration', extension: '101', image: staffVinod }
 */
export const SUPPORT_TEAM: TeamMember[] = [];


export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'deleted';
  leads: string[];
  accountIDs: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LinkedInProfile {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}

export interface PersonalizedMessageResponse {
  message: string;
}

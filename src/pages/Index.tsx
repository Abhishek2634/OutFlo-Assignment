
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CampaignDashboard from '@/components/CampaignDashboard';
import MessageGenerator from '@/components/MessageGenerator';
import CampaignModal from '@/components/CampaignModal';
import { Campaign } from '@/types/Campaign';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'messages'>('campaigns');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  // Mock data for demonstration
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Tech Startup Outreach',
      description: 'Reaching out to tech startup founders for collaboration opportunities',
      status: 'active',
      leads: [
        'https://linkedin.com/in/john-doe',
        'https://linkedin.com/in/jane-smith',
        'https://linkedin.com/in/tech-founder'
      ],
      accountIDs: ['acc_001', 'acc_002'],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      name: 'Enterprise Sales Campaign',
      description: 'Targeting enterprise clients for our SaaS platform',
      status: 'inactive',
      leads: [
        'https://linkedin.com/in/enterprise-cto',
        'https://linkedin.com/in/decision-maker'
      ],
      accountIDs: ['acc_003'],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18')
    }
  ]);

  const handleCreateCampaign = () => {
    setEditingCampaign(null);
    setIsModalOpen(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleSaveCampaign = (campaignData: Partial<Campaign>) => {
    if (editingCampaign) {
      // Update existing campaign
      setCampaigns(prev => prev.map(c => 
        c.id === editingCampaign.id 
          ? { ...c, ...campaignData, updatedAt: new Date() }
          : c
      ));
    } else {
      // Create new campaign
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        name: campaignData.name || '',
        description: campaignData.description || '',
        status: campaignData.status || 'active',
        leads: campaignData.leads || [],
        accountIDs: campaignData.accountIDs || [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setCampaigns(prev => [...prev, newCampaign]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'deleted' } : c
    ));
  };

  const handleToggleStatus = (id: string) => {
    setCampaigns(prev => prev.map(c => 
      c.id === id 
        ? { 
            ...c, 
            status: c.status === 'active' ? 'inactive' : 'active',
            updatedAt: new Date()
          }
        : c
    ));
  };

  // Filter out deleted campaigns
  const activeCampaigns = campaigns.filter(c => c.status !== 'deleted');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ON</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Outreach Nexus</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleCreateCampaign}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm w-fit">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'campaigns'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Campaigns
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'messages'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Message Generator
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'campaigns' ? (
          <CampaignDashboard
            campaigns={activeCampaigns}
            onEditCampaign={handleEditCampaign}
            onDeleteCampaign={handleDeleteCampaign}
            onToggleStatus={handleToggleStatus}
          />
        ) : (
          <MessageGenerator />
        )}
      </main>

      {/* Campaign Modal */}
      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCampaign}
        campaign={editingCampaign}
      />
    </div>
  );
};

export default Index;

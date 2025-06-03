
import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Campaign } from '@/types/Campaign';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaign: Partial<Campaign>) => void;
  campaign?: Campaign | null;
}

const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose,
  onSave,
  campaign,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active' as 'active' | 'inactive',
    leads: [''],
    accountIDs: [''],
  });

  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name,
        description: campaign.description,
        status: campaign.status as 'active' | 'inactive',
        leads: campaign.leads.length > 0 ? campaign.leads : [''],
        accountIDs: campaign.accountIDs.length > 0 ? campaign.accountIDs : [''],
      });
    } else {
      setFormData({
        name: '',
        description: '',
        status: 'active',
        leads: [''],
        accountIDs: [''],
      });
    }
  }, [campaign, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanedData = {
      ...formData,
      leads: formData.leads.filter(lead => lead.trim() !== ''),
      accountIDs: formData.accountIDs.filter(id => id.trim() !== ''),
    };

    onSave(cleanedData);
  };

  const addLeadField = () => {
    setFormData(prev => ({
      ...prev,
      leads: [...prev.leads, '']
    }));
  };

  const removeLeadField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      leads: prev.leads.filter((_, i) => i !== index)
    }));
  };

  const updateLead = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      leads: prev.leads.map((lead, i) => i === index ? value : lead)
    }));
  };

  const addAccountField = () => {
    setFormData(prev => ({
      ...prev,
      accountIDs: [...prev.accountIDs, '']
    }));
  };

  const removeAccountField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      accountIDs: prev.accountIDs.filter((_, i) => i !== index)
    }));
  };

  const updateAccount = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      accountIDs: prev.accountIDs.map((account, i) => i === index ? value : account)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {campaign ? 'Edit Campaign' : 'Create New Campaign'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter campaign name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => 
                setFormData(prev => ({ ...prev, status: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your campaign objectives..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>LinkedIn Profile URLs</Label>
              <Button type="button" onClick={addLeadField} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Lead
              </Button>
            </div>
            <div className="space-y-2">
              {formData.leads.map((lead, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={lead}
                    onChange={(e) => updateLead(index, e.target.value)}
                    placeholder="https://linkedin.com/in/profile-name"
                    className="flex-1"
                  />
                  {formData.leads.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeLeadField(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Account IDs</Label>
              <Button type="button" onClick={addAccountField} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Account
              </Button>
            </div>
            <div className="space-y-2">
              {formData.accountIDs.map((account, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={account}
                    onChange={(e) => updateAccount(index, e.target.value)}
                    placeholder="Account ID (e.g., acc_001)"
                    className="flex-1"
                  />
                  {formData.accountIDs.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeAccountField(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {campaign ? 'Update Campaign' : 'Create Campaign'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignModal;


import React, { useState } from 'react';
import { Sparkles, Copy, RotateCcw, User, Briefcase, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { LinkedInProfile } from '@/types/Campaign';

const MessageGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [profileData, setProfileData] = useState<LinkedInProfile>({
    name: 'John Doe',
    job_title: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    summary: 'Experienced software engineer with 8+ years in full-stack development. Passionate about building scalable web applications and leading development teams. Currently focused on AI/ML integration and cloud architecture.'
  });

  const handleInputChange = (field: keyof LinkedInProfile, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateMessage = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI-generated message based on profile data
    const mockMessage = `Hi ${profileData.name},

I came across your profile and was impressed by your experience as a ${profileData.job_title} at ${profileData.company}. Your background in ${profileData.summary.split('.')[0].toLowerCase()} particularly caught my attention.

I'm reaching out because I believe there might be a great opportunity for collaboration between our companies. We're working on some exciting projects that could benefit from someone with your expertise in the ${profileData.location} area.

Would you be open to a brief conversation to explore potential synergies? I'd love to learn more about your current initiatives at ${profileData.company} and share how we might be able to work together.

Best regards,
[Your Name]

P.S. I noticed you're based in ${profileData.location} - I'd be happy to connect over coffee if you're interested!`;

    setGeneratedMessage(mockMessage);
    setIsGenerating(false);
    
    toast({
      title: "Message Generated!",
      description: "Your personalized outreach message has been created.",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard.",
    });
  };

  const clearForm = () => {
    setProfileData({
      name: '',
      job_title: '',
      company: '',
      location: '',
      summary: ''
    });
    setGeneratedMessage('');
  };

  const loadSampleData = () => {
    setProfileData({
      name: 'Sarah Chen',
      job_title: 'VP of Engineering',
      company: 'InnovateTech Solutions',
      location: 'Austin, TX',
      summary: 'Seasoned engineering leader with 12+ years building and scaling high-performance teams. Expert in cloud infrastructure, DevOps, and agile methodologies. Currently leading digital transformation initiatives and building next-generation SaaS platforms.'
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">LinkedIn Message Generator</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Generate personalized outreach messages based on LinkedIn profile data. 
          Input the profile information below and let AI craft the perfect message for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              LinkedIn Profile Data
            </CardTitle>
            <div className="flex space-x-2">
              <Button 
                onClick={loadSampleData} 
                variant="outline" 
                size="sm"
                className="text-xs"
              >
                Load Sample Data
              </Button>
              <Button 
                onClick={clearForm} 
                variant="outline" 
                size="sm"
                className="text-xs"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                Full Name
              </Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job_title" className="flex items-center">
                <Briefcase className="w-4 h-4 mr-1" />
                Job Title
              </Label>
              <Input
                id="job_title"
                value={profileData.job_title}
                onChange={(e) => handleInputChange('job_title', e.target.value)}
                placeholder="e.g., Senior Software Engineer"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center">
                <Briefcase className="w-4 h-4 mr-1" />
                Company
              </Label>
              <Input
                id="company"
                value={profileData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="e.g., TechCorp Inc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Location
              </Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., San Francisco, CA"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary" className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                Profile Summary
              </Label>
              <Textarea
                id="summary"
                value={profileData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                placeholder="Professional summary from LinkedIn profile..."
                rows={4}
                required
              />
            </div>

            <Button
              onClick={generateMessage}
              disabled={isGenerating || !profileData.name || !profileData.job_title}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generating Message...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Personalized Message
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Message */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl">
              <span className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                Generated Message
              </span>
              {generatedMessage && (
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {generatedMessage ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                    {generatedMessage}
                  </pre>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={generateMessage}
                    variant="outline"
                    size="sm"
                    disabled={isGenerating}
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Regenerate
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy Message
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No message generated yet</p>
                <p className="text-sm text-gray-400">
                  Fill in the profile data and click "Generate Personalized Message" to get started.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-3">💡 Tips for Better Messages</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Include specific details from the person's profile to show genuine interest</li>
            <li>• Keep the message concise but personalized (under 200 words)</li>
            <li>• Always include a clear call-to-action</li>
            <li>• Mention mutual connections or shared interests when possible</li>
            <li>• Review and customize the generated message before sending</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageGenerator;

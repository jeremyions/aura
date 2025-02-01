'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to Auna',
    description: "Let's get you set up with your AI assistant."
  },
  {
    id: 'preferences',
    title: 'Set Your Preferences',
    description: 'Help us customize your experience.'
  },
  {
    id: 'personality',
    title: 'Choose AI Personality',
    description: 'Select how you'd like your AI to interact with you.'
  },
  {
    id: 'complete',
    title: 'All Set!',
    description: 'You're ready to start using Auna.'
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    name: '',
    aiPersonality: 'friendly',
    primaryUse: 'personal',
    theme: 'auto'
  });
  
  const router = useRouter();
  const { user } = useUser();

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save preferences to Supabase
      if (user) {
        await supabase
          .from('user_preferences')
          .upsert({
            user_id: user.id,
            ...preferences,
            onboarding_completed: true
          });
      }
      router.push('/chat');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.id) {
      case 'welcome':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{step.title}</h2>
            <p className="text-gray-600">{step.description}</p>
            <div className="space-y-2">
              <label className="block text-sm font-medium">What should we call you?</label>
              <input
                type="text"
                value={preferences.name}
                onChange={(e) => setPreferences({ ...preferences, name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Your name"
              />
            </div>
          </div>
        );
        
      case 'preferences':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{step.title}</h2>
            <p className="text-gray-600">{step.description}</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Primary Use</label>
                <select
                  value={preferences.primaryUse}
                  onChange={(e) => setPreferences({ ...preferences, primaryUse: e.target.value })}
                  className="w-full p-2 border rounded mt-1"
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="education">Education</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Theme Preference</label>
                <select
                  value={preferences.theme}
                  onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                  className="w-full p-2 border rounded mt-1"
                >
                  <option value="auto">Auto (System)</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 'personality':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{step.title}</h2>
            <p className="text-gray-600">{step.description}</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {['friendly', 'professional', 'creative', 'analytical'].map((personality) => (
                <button
                  key={personality}
                  onClick={() => setPreferences({ ...preferences, aiPersonality: personality })}
                  className={`p-4 border rounded-lg text-left ${
                    preferences.aiPersonality === personality
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="font-medium capitalize">{personality}</div>
                  <div className="text-sm text-gray-500">
                    {getPersonalityDescription(personality)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
        
      case 'complete':
        return (
          <div className="space-y-4 text-center">
            <div className="text-5xl">🎉</div>
            <h2 className="text-2xl font-bold">{step.title}</h2>
            <p className="text-gray-600">
              Thanks {preferences.name}! Your AI assistant is ready to help you.
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };

  const getPersonalityDescription = (personality: string) => {
    const descriptions: { [key: string]: string } = {
      friendly: 'Casual and approachable, like chatting with a friend',
      professional: 'Formal and business-like communication',
      creative: 'Imaginative and artistic in responses',
      analytical: 'Logical and data-driven approach'
    };
    return descriptions[personality] || '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  index < steps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      index < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {renderStepContent()}
          
          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

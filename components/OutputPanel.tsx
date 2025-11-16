import React, { useState, useEffect, useCallback } from 'react';
import { PromptStructure, TargetAI } from '../types';
import { TARGET_AI_MODELS } from '../constants';
import { CopyIcon, CheckIcon, SparklesIcon } from './icons/Icons';
import Loader from './Loader';
import { useLanguage } from '../contexts/LanguageContext';

interface OutputPanelProps {
  promptData: PromptStructure | null;
  compactPrompt: string | null;
  setPromptData: React.Dispatch<React.SetStateAction<PromptStructure | null>>;
  isLoading: boolean;
  error: string | null;
  outputTitle: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ promptData, compactPrompt, setPromptData, isLoading, error, outputTitle }) => {
  const { t } = useLanguage();
  const [targetAI, setTargetAI] = useState<TargetAI>(TargetAI.MIDJOURNEY);
  const [copied, setCopied] = useState(false);
  const [editableCompactPrompt, setEditableCompactPrompt] = useState('');

  const insetStyle = "shadow-[inset_5px_5px_10px_#1b1825,inset_-5px_-5px_10px_#3b364f]";
  
  useEffect(() => {
    if (compactPrompt) {
      setEditableCompactPrompt(compactPrompt);
    }
  }, [compactPrompt]);

  const handleModuleChange = useCallback((key: keyof PromptStructure, value: string) => {
    setPromptData(prev => prev ? { ...prev, [key]: value } : null);
  }, [setPromptData]);

  const assemblePrompt = useCallback(() => {
    if (compactPrompt) {
        return editableCompactPrompt;
    }
    if (!promptData) return '';
    
    const parts = [
      promptData.subject,
      promptData.scene,
      promptData.mood,
      promptData.style,
      promptData.lighting,
      promptData.camera,
      promptData.details
    ].filter(Boolean).join(', ');

    let finalPrompt = parts;

    if (targetAI === TargetAI.MIDJOURNEY) {
      finalPrompt += ` --ar 16:9`;
      if (promptData.negativePrompt) {
        finalPrompt += ` --no ${promptData.negativePrompt}`;
      }
    } else if (targetAI === TargetAI.STABLE_DIFFUSION) {
        if (promptData.negativePrompt) {
            finalPrompt += `\nNegative prompt: ${promptData.negativePrompt}`;
        }
    }
    // DALL-E prefers natural language, so we don't add special parameters.

    return finalPrompt;
  }, [promptData, compactPrompt, editableCompactPrompt, targetAI]);

  const copyToClipboard = useCallback(() => {
    const fullPrompt = assemblePrompt();
    navigator.clipboard.writeText(fullPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [assemblePrompt]);

  useEffect(() => {
    if (error || promptData || compactPrompt) {
      setCopied(false);
    }
  }, [error, promptData, compactPrompt]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full">
            <Loader />
            <p className="mt-4 text-lg font-semibold text-[#F0F0F0]">{t('loadingTitle')}</p>
            <p className="text-[#F0F0F0]/60 mt-2">{t('loadingSubtitle')}</p>
        </div>
      );
    }
    if (error) {
      return <div className={`flex items-center justify-center h-full p-4 text-[#F1AA9B] bg-[#2B273A] rounded-2xl ${insetStyle}`}>{error}</div>;
    }

    if (compactPrompt) {
        return (
            <div>
                 <label className="text-sm font-bold text-[#F0F0F0] mb-2 block">
                    {outputTitle || t('compactPromptTitle')}
                </label>
                <textarea
                    value={editableCompactPrompt}
                    onChange={(e) => setEditableCompactPrompt(e.target.value)}
                    className={`w-full p-4 bg-[#2B273A] rounded-2xl border-none focus:outline-none focus:shadow-[inset_3px_3px_7px_#1b1825,inset_-3px_-3px_7px_#3b364f] transition-shadow resize-y text-[#F0F0F0] placeholder:text-[#F0F0F0]/40 ${insetStyle}`}
                    rows={15}
                />
            </div>
        )
    }

    if (promptData) {
        return (
            <div className="space-y-4">
              {Object.entries(promptData).map(([key, value]) => (
                <div key={key}>
                  <label className="text-sm font-bold text-[#F0F0F0] capitalize mb-1 block">
                    {t(key as keyof PromptStructure)}
                  </label>
                  <textarea
                    value={value}
                    onChange={(e) => handleModuleChange(key as keyof PromptStructure, e.target.value)}
                    className={`w-full p-2 bg-[#2B273A] rounded-xl border-none focus:outline-none focus:shadow-[inset_3px_3px_7px_#1b1825,inset_-3px_-3px_7px_#3b364f] transition-shadow resize-y text-[#F0F0F0] ${insetStyle}`}
                    rows={key === 'scene' || key === 'subject' ? 3 : 2}
                  />
                </div>
              ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center text-center h-full p-4">
            <SparklesIcon className="h-16 w-16 text-[#F0C38E] opacity-50 mb-4" />
            <h3 className="text-xl font-bold text-[#F0F0F0]">{t('placeholderTitle')}</h3>
            <p className="text-[#F0F0F0]/60 mt-2">{t('placeholderSubtitle')}</p>
        </div>
    );
  };
  
  return (
    <div className="bg-[#2B273A] rounded-3xl shadow-[8px_8px_16px_#1b1825,-8px_-8px_16px_#3b364f] flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-transparent">
        <h2 className="text-xl font-bold text-[#F0F0F0]">{t('generatedPromptTitle')}</h2>
      </div>

      <div className="p-6 flex-grow overflow-y-auto">
        {renderContent()}
      </div>

      {(promptData || compactPrompt) && !isLoading && (
        <div className="p-6 bg-[#2B273A] space-y-4">
          <div>
            <label htmlFor="target-ai" className="block text-sm font-medium text-[#F0F0F0] mb-2">{t('targetAI')}</label>
            <select
              id="target-ai"
              value={targetAI}
              onChange={(e) => setTargetAI(e.target.value as TargetAI)}
              className={`w-full bg-[#2B273A] border-none rounded-xl pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:shadow-[inset_3px_3px_7px_#1b1825,inset_-3px_-3px_7px_#3b364f] sm:text-sm appearance-none ${insetStyle}`}
            >
              {TARGET_AI_MODELS.map(model => <option key={model} value={model} className="bg-[#2B273A] text-[#F0F0F0]">{model}</option>)}
            </select>
          </div>
          <button
            onClick={copyToClipboard}
            className="w-full bg-[#F0C38E] text-[#312C51] font-bold py-3 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[5px_5px_10px_#1b1825,-5px_-5px_10px_#3b364f] hover:shadow-[2px_2px_5px_#1b1825,-2px_-2px_5px_#3b364f] active:shadow-[inset_5px_5px_10px_#1b1825,inset_-5px_-5px_10px_#3b364f]"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? t('copied') : t('copyButton')}
          </button>
        </div>
      )}
    </div>
  );
};

export default OutputPanel;
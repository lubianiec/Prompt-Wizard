export const translations = {
  pl: {
    translation: {
      // InputPanel
      generateFromText: 'Generuj z Tekstu',
      generateFromImage: 'Generuj z Obrazu',
      textPlaceholder: "Wprowadź prosty pomysł, np. 'kot na Marsie' lub 'skrypt w Pythonie'...",
      dragDrop: 'Przeciągnij i upuść obraz',
      clickToBrowse: 'lub kliknij, aby przeglądać',
      videoPlaceholder: 'Opcjonalnie: Opisz scenę wideo...',
      professionalButton: 'Profesjonalny',
      compactButton: 'Kompaktowy',
      detailedButton: 'Szczegółowy',
      includeImageDetailsLabel: 'Uwzględnij szczegóły obrazu',

      // OutputPanel
      generatedPromptTitle: 'Wygenerowany Prompt',
      loadingTitle: 'Architektura Twojej wizji...',
      loadingSubtitle: 'AI analizuje Twoje dane wejściowe.',
      placeholderTitle: 'Gotowy do tworzenia?',
      placeholderSubtitle: 'Wygeneruj prompt z tekstu lub obrazu.',
      targetAI: 'Docelowy model AI',
      copyButton: 'Kopiuj Końcowy Prompt',
      copied: 'Skopiowano!',
      
      // Prompt Structure Keys
      scene: 'Scena / Kontekst',
      subject: 'Przedmiot / Subiekt',
      style: 'Styl Wizualny',
      lighting: 'Oświetlenie',
      camera: 'Perspektywa / Kamera',
      details: 'Szczegółowość / Jakość',
      mood: 'Emocje / Nastrój',
      negativePrompt: 'Prompt Negatywny',
      
      // Titles
      generatingTitle: 'Generowanie...',
      professionalPromptTitle: 'Profesjonalny Prompt',
      videoPromptTitle: 'Prompt Wideo',
      structuredPromptTitle: 'Prompt Ustrukturyzowany',
      compactPromptTitle: 'Prompt Kompaktowy',

      // Errors
      errorNoText: 'Proszę wprowadzić tekst.',
      errorInvalidImage: 'Proszę przesłać prawidłowy plik obrazu.',
      errorNoInput: 'Brak prawidłowych danych wejściowych.',
      errorPrefix: 'Wystąpił błąd',
      errorUnknown: 'Wystąpił nieznany błąd.',
      errorInvalidApiKey: 'Twój klucz API jest nieprawidłowy. Proszę wybrać prawidłowy klucz, aby kontynuować.',

      // API Key Screen
      apiKeyTitle: 'Wymagany Klucz API',
      apiKeyDescription: 'Aby korzystać z Prompt Wizard, musisz wybrać klucz API Google AI Studio. Umożliwi to aplikacji połączenie z modelem Gemini.',
      apiKeyBillingPre: 'Korzystanie z Gemini API może wiązać się z kosztami. Proszę zapoznać się z',
      apiKeyBillingLink: 'informacjami o rozliczeniach',
      apiKeyButton: 'Wybierz Klucz API',
    },
  },
  en: {
    translation: {
      // InputPanel
      generateFromText: 'Generate from Text',
      generateFromImage: 'Generate from Image',
      textPlaceholder: "Enter a simple idea, e.g., 'a cat on Mars' or 'a Python script'...",
      dragDrop: 'Drag & drop an image here',
      clickToBrowse: 'or click to browse',
      videoPlaceholder: 'Optional: Describe the video scene...',
      professionalButton: 'Professional',
      compactButton: 'Compact',
      detailedButton: 'Detailed',
      includeImageDetailsLabel: 'Include image details',

      // OutputPanel
      generatedPromptTitle: 'Generated Prompt',
      loadingTitle: 'Architecting Your Vision...',
      loadingSubtitle: 'The AI is analyzing your input.',
      placeholderTitle: 'Ready to Create?',
      placeholderSubtitle: 'Generate a prompt from text or an image.',
      targetAI: 'Target AI Model',
      copyButton: 'Copy Final Prompt',
      copied: 'Copied!',
      
      // Prompt Structure Keys
      scene: 'Scene / Context',
      subject: 'Subject',
      style: 'Visual Style',
      lighting: 'Lighting',
      camera: 'Perspective / Camera',
      details: 'Detail / Quality',
      mood: 'Emotion / Mood',
      negativePrompt: 'Negative Prompt',

      // Titles
      generatingTitle: 'Generating...',
      professionalPromptTitle: 'Professional Prompt',
      videoPromptTitle: 'Video Prompt',
      structuredPromptTitle: 'Structured Prompt',
      compactPromptTitle: 'Compact Prompt',

      // Errors
      errorNoText: 'Please enter some text.',
      errorInvalidImage: 'Please upload a valid image file.',
      errorNoInput: 'No valid input provided.',
      errorPrefix: 'An error occurred',
      errorUnknown: 'An unknown error occurred.',
      errorInvalidApiKey: 'Your API Key is invalid. Please select a valid key to continue.',
      
      // API Key Screen
      apiKeyTitle: 'API Key Required',
      apiKeyDescription: 'To use Prompt Wizard, you need to select a Google AI Studio API key. This enables the app to connect to the Gemini model.',
      apiKeyBillingPre: 'Using the Gemini API may incur costs. Please review the',
      apiKeyBillingLink: 'billing information',
      apiKeyButton: 'Select API Key',
    },
  },
};
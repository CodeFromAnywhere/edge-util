/**
 * keys are the iso codes which will be saved in the db, the values are values which can be shown to the user in any UI
 */
export const languages = {
  // added later:
  // hebrew: "Hebrew",

  /////
  english: "English",
  dutch: "Dutch (Nederlands)",
  nepali: "Nepali",
  portuguese: "Portuguese",
  brazilian: "Portuguese (Brazilian)",
  german: "German (Deutsch)",
  french: "French",
  spanish: "Spanish",
  italian: "Italian",
  norwegian: "Norwegian",
  swedish: "Swedish",
  danish: "Danish",
  vietnamese: "Vietnamese",
  indonesian: "Indonesian (Bahasa)",
  southAfrican: "South African (Afrikaans)",
  tokiPona: "Toki Pona",
  hindi: "Hindi",
  mandarin: "Mandarin (Chinese)",
  arabic: "Arabic",
  bengali: "Bengali",
  urdu: "Urdu",
  japanese: "Japanese",
  swahili: "Swahili",
};

/**
 * all currently supported languages
 */
export type Language = keyof typeof languages;

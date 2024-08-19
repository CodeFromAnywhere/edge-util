export const generateRandomString = (length: number) => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const characterArray = "x".repeat(length).split("");

  const string: string = characterArray
    .map(() => {
      const randomIndex = Math.floor(Math.random() * characters.length); //0-63 --> index for above
      const character = characters.charAt(randomIndex);
      return character;
    })
    .join("");

  return string;
};

/**
 * 24 characters of the alphabet provides 9E33 combinations, wont be possible to brute-force in centuries, even if there are billions of entries
 */
export const generateId = (): string => {
  return generateRandomString(24).toLowerCase();
};

/**
 * generates a password. By default, uses a length of 14
 */
export const generatePassword = (passwordLength: number = 14) => {
  return generateRandomString(passwordLength);
};

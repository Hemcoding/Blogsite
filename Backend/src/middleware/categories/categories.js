function formatCategory(inputCategory) {
    // Split the input string into words
    const words = inputCategory.split(' ');
  
    // Define a list of common conjunction words to keep in lowercase
    const conjunctions = ['and', 'or', 'but', 'for', 'nor', 'so', 'yet'];
  
    // Capitalize the first letter of each word
    const formattedWords = words.map((word, index) => {
      // Convert the first word to uppercase
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        // Check if the word is a conjunction and keep it in lowercase
        return conjunctions.includes(word.toLowerCase()) ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1);
      }
    });
  
    // Join the formatted words back into a single string
    return formattedWords.join(' ');
  }

export default {
    formatCategory
}
  

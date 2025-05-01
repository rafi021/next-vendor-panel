/**
 * @Example "58_Two tangs/55_Three while"
 * @param str Variation title
 * @param index 0 = id, 1 = name(default 1)
 * @return index = 1 => ['Two tangs', 'Three while'] or index = 0 => ['58', '55']
 */
export const formatVariationTitle = (str: string, index = 1): string[] => {
  const matches = str.split('/').map((item) => item.split('_')[index]);
  return matches;
};

/**
 * @param str which needs to be slugify
 * @return slugged string
 * @example slugify('Hello World') => 'hello-world'
 * */
export function slugify(str: string): string {
  str = str?.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str?.toLowerCase(); // convert string to lowercase
  str = str
    ?.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
    ?.replace(/\s+/g, '-') // replace spaces with hyphens
    ?.replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
}

export function generateSlugFromTextEditorText(input: string): string {
  // Remove HTML tags and extract text content
  const textContent = input.replace(/<[^>]*>/g, '').trim();

  return textContent
    .toLowerCase() // Convert to lowercase
    .normalize('NFD') // Normalize characters (e.g., é -> e)
    .replace(/\p{Diacritic}/gu, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ''); // Trim hyphens from start and end
}

export const createRegex = (matchKeyword: string): RegExp => {
  const keyword = matchKeyword.trim().replace(/\s+/g, ' ');
  return new RegExp(keyword, 'gi');
};

export const matchExactKey = (key: string, list: string[]): boolean => {
  return list.some(entry => key === entry);
};

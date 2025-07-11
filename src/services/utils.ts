export const getKey = () => {
  const arr = '379d96759ca1f073b651c08c3b38a4c2';
  let result = '';

  for (let i = arr.length - 1; i >= 0; i--) {
    result += arr[i];
  }

  return result;
};

export const getKey = (arr: string) => {
  let result = '';

  for (let i = arr.length - 1; i >= 0; i--) {
    result += arr[i];
  }

  return result;
};

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
};

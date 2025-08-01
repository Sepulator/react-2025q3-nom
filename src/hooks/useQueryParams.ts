import { useSearchParams } from 'react-router';

export const useQueryParams = () => {
  const [searchParams] = useSearchParams();

  const getSearchString = (excludeParams: string[] = []) => {
    const searchString = Array.from(searchParams.entries())
      .filter(([key]) => !excludeParams.includes(key))
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return searchString ? `?${searchString}` : '';
  };

  const createDetailPath = (id: string) => {
    const searchString = getSearchString();
    return `/details/${id}${searchString}`;
  };

  const createRootPath = (excludeParams: string[] = []) => {
    const searchString = getSearchString(excludeParams);
    return searchString ? `/${searchString}` : '/';
  };

  return {
    getSearchString,
    createDetailPath,
    createRootPath,
  };
};

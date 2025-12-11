import useSWR from 'swr';
import { fetcher } from '../lib/api.js';

const DataPreloader = () => {
  useSWR('/about', fetcher);
  useSWR('/education', fetcher);
  useSWR('/experience', fetcher);
  useSWR('/awards', fetcher);
  useSWR('/certificates', fetcher);
  useSWR('/skills', fetcher);
  useSWR('/projects', fetcher);
  useSWR('/services', fetcher);
  useSWR('/blogs', fetcher);

  return null;
};

export default DataPreloader;

import { ogImage } from '../../lib/og';

export const GET = () =>
  ogImage({
    title: 'A small workshop of open-source developer tools.',
    description: 'Lonca and Baron, each with its own site and its own mark, and one place where we write about them.',
    mark: '/brand/zanaat-mark.svg',
    label: 'Zanaat',
  });

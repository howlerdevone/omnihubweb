export interface App {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  relatedCategories: string[];
}

export const APPS: App[] = [
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Connect spreadsheets, docs, and shared assets.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAoNji0jjIkswED2IESx788B72Qv_XzMaNcKZzhjZw8OtCoTsQtoVjstJgv5M4b44asU7Vs5ObeV1KPDEGDjI7gyHYAO83Mj9bmUuO1J57mYZCL_rLbZEvNihzlAd_qXCKvN7ECm30MaYUUBSFMP8VjhpmCYNYDQ9LxSH58isgTCt0ANo05GstXwyMT3Zrrxyx6gLi5DcoRO2urOW3uvIDTTXzCXl2RQwnYp5EcIXTU72ZHsGuTPm2M',
    tags: ['Core', 'Verified'],
    relatedCategories: ['operations', 'marketing'],
  },
  {
    id: 'outlook',
    name: 'Outlook',
    description: 'Sync calendars and analyze organizational communications.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDlngCHnm0hzV94VTiehbLg7wH--XBNgv9JyHO7ZSFaI9r-8Tp3k1IlXmJNbzbDZMakxjXgTYv1h79PzHXqXrO_IzUS8de-aY5zlp5TAukydDWXYDuXrPMmFeaOI4cVswvN_XO_wNoP8SGq39AnBinCquiBA0CfsbjIvud9xXld1sUeve39sLsbIFEoEE75Zn9i_w6fP6Hw9tIlijFplmE-AyWjEO814ru3aUvFndBfnA-pAv_6Eer9',
    tags: ['SaaS', 'Enterprise'],
    relatedCategories: ['operations', 'marketing'],
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Ingest knowledge bases and project roadmaps.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGo6jteXBoE3Qyb2YXjV9nO2hclRlV3YDbTc4V89UduYojYrdo8FW-uoY73xapUtwnov-M5opJ3QHBVt4ln5-RF8p0lsbCPlNeCoPuF5KX_uuykw8VKM5OvNs975TIbD5WYcB91sthHnQRD3pREvXGVTiVYnrI5mRYN5k2FGXqKNyO5k2l5vVTy46-nduNEVR7p-uveAGuEIveCZlBZo-tfuPJhTZ12HvXS-WJmlDbUGbqlMqkEFBX',
    tags: ['Docs'],
    relatedCategories: ['operations'],
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Real-time financial auditing and tax forecasting.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDAI6jJjpZRlfDmVRzcoVSJRrQOItqAsY90-QV97jJ5cUJd5hVNB4iOzeNM8anlNHz2eIIGsrsn_Sik6ww1VAXl94-XBhASZmdDvJtTp6hasWJpg2YXqVIxHVCnNCG-M5RO-EsK00iiSocRt73eLGrnwEGxycYck-Wjh88NEG5K4N6IkuY9Ii9UfDA3g2zq9IjuONUmoOwkF55CE5tO7Hd5JPKsmrlplrCiCEHYGdcndWf3vMpsuDzJ',
    tags: ['Finance', 'Advanced'],
    relatedCategories: ['finance'],
  },
];

import { env } from '~/config/env.client';

export const plantGridLdJson = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Herbário Virtual FC',
  url: new URL('/museu/herbario', env.NEXT_PUBLIC_APP_URL).toString(),
  description:
    'Portal científico do Herbário Virtual FC com foco em pesquisa, educação e divulgação botânica.',
  potentialAction: {
    '@type': 'SearchAction',
    target: (() => {
      const url = new URL('/museu/herbario', env.NEXT_PUBLIC_APP_URL);
      url.searchParams.set('termo', '{search_term_string}');
      return url.toString();
    })(),
    'query-input': 'required name=search_term_string',
  },
} as const;

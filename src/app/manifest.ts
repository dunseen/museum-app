import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Herbário Virtual FC | UFRA',
    short_name: 'Herbário UFRA',
    description:
      'Explore o acervo científico do Herbário Virtual FC da Universidade Federal Rural da Amazônia.',
    id: '/app/museu/herbario/',
    start_url: '/app/museu/herbario',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#006633',
    lang: 'pt-BR',
    dir: 'ltr',
    categories: ['education', 'science', 'reference'],
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/app/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/app/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: 'museu_herbario.png',
        label: 'Página inicial do herbário',
        type: 'image/png',
        sizes: '1900x1786',
        form_factor: 'narrow',
      },
    ],
  };
}

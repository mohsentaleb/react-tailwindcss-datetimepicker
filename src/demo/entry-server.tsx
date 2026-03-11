import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import AppRoutes from './AppRoutes';

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );
}

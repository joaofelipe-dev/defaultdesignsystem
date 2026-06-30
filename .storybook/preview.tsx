import type { Preview } from '@storybook/react';
import '../templates/styles/design-tokens.css';
import '../templates/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

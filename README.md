<p align="center">
  <img src="https://raw.githubusercontent.com/mohsentaleb/react-tailwindcss-datetimepicker/master/src/demo/assets/logo.png" alt="React TailwindCSS DateTimePicker" width="80" />
</p>

<h1 align="center">React TailwindCSS Date and Time Picker</h1>

<p align="center">
  Feature-rich React date-time range picker with customizable presets, keyboard navigation, TypeScript support, and dark mode. Built on <strong>React 18</strong> and <a href="https://tailwindcss.com/">TailwindCSS</a>.
</p>

<p align="center">
  <a href="https://github.com/mohsentaleb/react-tailwindcss-datetimepicker/blob/master/LICENSE.md">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" />
  </a>
  <a href="https://www.npmjs.com/package/react-tailwindcss-datetimepicker">
    <img src="https://img.shields.io/npm/dm/react-tailwindcss-datetimepicker.svg?style=flat-square" alt="Downloads" />
  </a>
</p>

<p align="center">
  <a href="https://reactdatetime.dev"><strong>Official Documentation & Playground &rarr;</strong></a>
</p>

![Date Time Picker](https://raw.githubusercontent.com/mohsentaleb/react-tailwindcss-datetimepicker/master/public/demo.gif)

## Features

- Date range selection with start/end times
- Customizable preset ranges (e.g., Today, Last 30 Days)
- Keyboard navigation and accessibility
- Full TypeScript support
- Built-in dark mode
- Fully responsive, optimized for mobile
- 22 color themes (all Tailwind CSS named colors)
- No dependency on external date libraries

## Quick Start

```sh
npm i react-tailwindcss-datetimepicker
```

```tsx
import { useState } from 'react';
import DateTimePicker from 'react-tailwindcss-datetimepicker';
import 'react-tailwindcss-datetimepicker/style.css';

function App() {
  const [range, setRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 2)),
    end: new Date(),
  });

  return (
    <DateTimePicker
      start={range.start}
      end={range.end}
      applyCallback={(start, end) => setRange({ start, end })}
    >
      <button type="button">Pick dates</button>
    </DateTimePicker>
  );
}
```

> If you're already using TailwindCSS, you can skip the CSS import and add a `@source` directive instead. See the [Installation guide](https://reactdatetime.dev/docs/installation) for details.

## Documentation

Visit the official documentation at **[reactdatetime.dev](https://reactdatetime.dev)**:

- [Installation & Setup](https://reactdatetime.dev/docs/installation)
- [API Reference](https://reactdatetime.dev/docs/api-reference)
- [Customization & Themes](https://reactdatetime.dev/docs/customization)
- [Localization](https://reactdatetime.dev/docs/localization)
- [Migration Guide](https://reactdatetime.dev/docs/migration)
- [Interactive Playground](https://reactdatetime.dev/playground)

## Links

- [Official Documentation](https://reactdatetime.dev)
- [Discussion forums](https://github.com/mohsentaleb/react-tailwindcss-datetimepicker/discussions)
- [Report an issue](https://github.com/mohsentaleb/react-tailwindcss-datetimepicker/issues/new/choose)

## License

[MIT](https://github.com/mohsentaleb/react-tailwindcss-datetimepicker/blob/master/LICENSE.md)

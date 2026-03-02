# 📦 React TailwindCSS Date and Time Picker

Feature-rich React date-time picker with range selection, customizable presets, keyboard navigation, TypeScript support, dark mode, and no date library dependency. Fully responsive. Built on top of **React 18** and [Vitejs](https://vitejs.dev/).

- ✅ Selection of date ranges
- ✅ Selection of times within the chosen date range
- ✅ Customizable range presets for quick selection (e.g., Yesterday, last 30 days)
- ✅ Keyboard navigation for enhanced accessibility
- ✅ Full TypeScript support
- ✅ Built-in dark mode
- ✅ Fully responsive, optimized for mobile devices
- ✅ No dependency on external date libraries (compatible with vanilla JS, [date-fns](https://date-fns.org/), [moment](https://momentjs.com/), etc.)

<a href="https://github.com/mohsentaleb/react-tailwindcss-datetimepicker/blob/master/LICENSE.md">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="React Native for macOS is released under the MIT license." />
  </a>
<a href="https://www.npmjs.com/package/react-tailwindcss-datetimepicker">
    <img src="https://img.shields.io/npm/dm/react-tailwindcss-datetimepicker.svg?style=flat-square" alt="Downloads" />
</a>

## Online Demo

**Check out the [online demo](https://codesandbox.io/p/github/mohsentaleb/react-tailwindcss-datetimepicker/master) at codesandbox.io**

![Date Time Picker](https://raw.githubusercontent.com/mohsentaleb/react-tailwindcss-datetimepicker/master/public/demo.gif)

This project is a fork of [react-datetimepicker](https://github.com/v0ltoz/react-datetimepicker) with **significant alterations** including:

- Complete revamp of CSS styles utilizing [TailwindCSS](https://tailwindcss.com/).
- Transition to [Vitejs](https://vitejs.dev/) for the build system.
- Conversion of all files to TypeScript for improved type safety and development efficiency.

## Table of Contents

- [Installation](#installation)
  - [With TailwindCSS](#with-tailwindcss)
  - [Without TailwindCSS](#without-tailwindcss)
- [Basic Usage](#basic-usage)
  - [Function Components](#function-components)
  - [Legacy Class Components](#legacy-class-components)
- [Component Props](#component-props)
- [Development](#development)
- [Production](#production)
- [Migration](#migration)
  - [from `2.x.x to ` to `3.x.x`:](#from-2xx-to--to-3xx)
  - [From `1.x.x to ` to `2.x.x`:](#from-1xx-to--to-2xx)
- [Roadmap](#roadmap)
- [Get Help](#get-help)
- [License](#license)

## Installation

```shell
// Npm
npm i react-tailwindcss-datetimepicker

// Yarn
yarn add react-tailwindcss-datetimepicker
```

### With TailwindCSS

If you're already including TailwindCSS in your project, add a `@source` directive to your main CSS file so that Tailwind can find the class names used by the picker:

```css
/* your main CSS file */
@import "tailwindcss";
@source "../node_modules/react-tailwindcss-datetimepicker/dist/react-tailwindcss-datetimepicker.js";
/* Add the line above 👆 */
```

### Without TailwindCSS

If you don't use TailwindCSS in your project you can simply import the shipped standalone CSS file needed for this component like so:

```tsx
// src/main.tsx

import DateTimePicker from 'react-tailwindcss-datetimepicker';
import 'react-tailwindcss-datetimepicker/style.css';
```

## Basic Usage

### Function Components

```ts
import { useState } from "react";
import DateTimePicker from "react-tailwindcss-datetimepicker";

// If you are already using TailwindCSS, you can omit this.
// Check out section "Installing With TailwindCSS" in docs.
import "react-tailwindcss-datetimepicker/style.css";

const now = new Date();
const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const endOfToday = new Date(startOfToday);
endOfToday.setDate(endOfToday.getDate() + 1);
endOfToday.setSeconds(endOfToday.getSeconds() - 1);

function App() {
  // Set the initial view of picker to last 2 days
  const [selectedRange, setSelectedRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 2)),
    end: endOfToday,
  });

  function handleApply(startDate: Date, endDate: Date) {
    setSelectedRange({ start: startDate, end: endDate });
  }

  return (
    <DateTimePicker
      ranges={{
        Today: [new Date(startOfToday), new Date(endOfToday)],
        "Last 30 Days": [
          new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
            0,
            0,
            0,
            0
          ),
          new Date(endOfToday),
        ],
      }}
      start={selectedRange.start}
      end={selectedRange.end}
      applyCallback={handleApply}
    >
      <button type="button">{`${selectedRange.start} - ${selectedRange.end}`}</button>
    </DateTimePicker>
  );
}

export default App;
```

### Legacy Class Components

<details>
  <summary>For using it in a legacy class component check out the sample code here</summary>

```tsx
import React from 'react';
import DateTimePicker from 'react-tailwindcss-datetimepicker';

// If you are already using TailwindCSS, you can omit this.
// Check out section "Installing With TailwindCSS" in docs.
import 'react-tailwindcss-datetimepicker/style.css';

interface Props {}
interface State {
  start: Date;
  end: Date;
}

const now = new Date();
const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

const endOfToday = new Date(startOfToday);
endOfToday.setDate(endOfToday.getDate() + 1);
endOfToday.setSeconds(endOfToday.getSeconds() - 1);

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Set the initial view of picker to last 2 days
    this.state = {
      start: new Date(new Date().setDate(new Date().getDate() - 2)),
      end: endOfToday,
    };
  }

  applyCallback = (startDate: Date, endDate: Date) => {
    this.setState({
      start: startDate,
      end: endDate,
    });
  };

  render() {
    return (
      <DateTimePicker
        ranges={{
          Today: [new Date(startOfToday), new Date(endOfToday)],
          'Last 30 Days': [
            new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), 0, 0, 0, 0),
            new Date(endOfToday),
          ],
        }}
        start={this.state.start}
        end={this.state.end}
        applyCallback={this.applyCallback}
        displayMinDate
        displayMaxDate
      >
        <button type="button">{`${this.state.start} - ${this.state.end}`}</button>
      </DateTimePicker>
    );
  }
}

export default App;
```

</details>

## Component Props

| Option                                      | Required     | Type       | Default       | Description                                                                    |
|---------------------------------------------| ------------ | ---------- | ------------- |--------------------------------------------------------------------------------|
| [`ranges`](#ranges)                         | optional     | `Object`   | `{}`          | A record of ranges defined as labels and a tuple of Date times. When empty or omitted, the ranges panel is hidden. |
| [`start`](#start)                           | **Required** | `Date`     | `undefined`   | Initial start Date set in the picker                                           |
| [`end`](#end)                               | **Required** | `Date`     | `undefined`   | Initial end Date set in the picker                                             |
| [`applyCallback`](#applycallback)           | **Required** | `Function` | `undefined`   | Function which is called when the apply button is clicked                      |
| [`locale`](#locale)                         | optional     | `Object`   | `undefined`   | locale format for translatable labels                                          |
| [`rangeCallback`](#rangecallback)           | optional     | `Function` | `undefined`   | Function which is called when one of the preset ranges is clicked              |
| [`maxDate`](#maxdate)                       | optional     | `Date`     | `undefined`   | Maximum date that can be selected in calendar                                  |
| [`minDate`](#mindate)                       | optional     | `Date`     | `undefined`   | Minimum date that can be selected in calendar                                  |
| [`autoApply`](#autoapply)                   | optional     | `Boolean`  | `false`       | Set dates as soon as they're clicked without pressing apply                    |
| [`descendingYears`](#descendingyears)       | optional     | `Boolean`  | `true`        | Set years be displayed in descending order                                     |
| [`years`](#years)                           | optional     | `Array`    | `[1900, now]` | Limit the years shown in calendar                                              |
| [`smartMode`](#smartmode)                   | optional     | `Boolean`  | `false`       | Enables flexible date selection with ping-pong mode, auto-swap, and relaxed constraints |
| [`pastSearchFriendly`](#pastsearchfriendly) | optional     | `Boolean`  | `false`       | With `smartMode`, shifts the left calendar back one month instead of the right forward   |
| [`noMobileMode`](#nomobilemode)             | optional     | `Boolean`  | `false`       | Picker will always be displayed in full screen mode                            |
| [`forceMobileMode`](#forcemobilemode)       | optional     | `Boolean`  | `false`       | Picker will always be displayed in condensed mode all the time                 |
| [`twelveHoursClock`](#twelvehoursclock)     | optional     | `Boolean`  | `false`       | Display time values in a 12-hour format rather than a 24-hour format           |
| [`standalone`](#standalone)                 | optional     | `Boolean`  | `false`       | When set the picker will be open by default                                    |
| [`leftMode`](#leftmode)                     | optional     | `Boolean`  | `false`       | Picker will open to the left                                                   |
| [`centerMode`](#centermode)                 | optional     | `Boolean`  | `false`       | Picker will open in center                                                     |
| [`displayMinDate`](#displaymindate)         | optional     | `Boolean`  | `false`       | Will display Min Date in picker footer                                         |
| [`displayMaxDate`](#displaymaxdate)         | optional     | `Boolean`  | `false`       | Will display Max Date in picker footer                                         |
| [`classNames`](#classnames)                 | optional     | `Object`   | `undefined`   | Will override classNames for different parts of the picker                     |
| [`theme`](#theme)                           | optional     | `string`   | `sky`         | Color theme — all 22 Tailwind CSS named colors supported                       |

### `ranges`

(Required)
`Record<string, [Date, Date]>`

A record of ranges defined using a tuple of `Date` instances.

Using vanilla Javascript:

```js
const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));
startOfToday.setHours(0, 0, 0, 0);

const endOfToday = new Date(startOfToday);
endOfToday.setDate(endOfToday.getDate() + 1);
endOfToday.setSeconds(endOfToday.getSeconds() - 1);

const ranges = {
  Today: [startOfToday, endOfToday],
  // 'Last 30 Days': [start, end],
};
```

Or using [`date-fns`](https://date-fns.org/) lib:

```ts
import { add, sub, startOfDay } from 'date-fns';

const now = new Date();
const startOfToday = startOfDay(now);
const endOfToday = add(sub(startOfToday, { seconds: 1 }), { days: 1 });

const ranges = {
  Today: [startOfDay(startOfToday), endOfToday],
  'Last 30 Days': [startOfDay(sub(startOfToday, { days: 30 })), endOfToday],
};
```

### `start`

(Required)
`Date`

Initial start Date set in the picker

### `end`

(Required)
`Date`

Initial end Date set in the picker

### `applyCallback`

(Required) `(start: Date, end: Date) => void`

Function which is called when the apply button is clicked/pressed. Takes two params, start date and the end date.

### `locale`

(optional)

Locale for translatable labels. Can also set Sunday to be first day or Monday.

Example:

```ts
const locale = {
  format: 'dd-MM-yyyy HH:mm', // See: https://date-fns.org/v4.1.0/docs/format
  sundayFirst: false,
  days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'So'],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  fromDate: 'From Date',
  toDate: 'To Date',
  selectingFrom: 'Selecting From',
  selectingTo: 'Selecting To',
  minDate: 'Min Date',
  maxDate: 'Max Date',
  close: 'Close',
  apply: 'Apply',
  cancel: 'Cancel',
};
```

### `rangeCallback`

(optional) `(index: number, value: keyof PresetDateRanges) => void`

Function which is called when one of the preset ranges is clicked/selected. Takes two params:

- `index` is the index of item which is selected
- `value` is the label of that item

### `minDate`

(optional) `Date`

Minimum date that can be selected in calendar.

### `maxDate`

(optional) `Date`

Maximum date that can be selected in calendar.

### `autoApply`

(optional) `boolean` defaults to `false`

When set there will only be one button in the bottom right to close the screen. With this set to `true` upon changing anything in picker the `applyCallback` will be automatically called

### `descendingYears`

(optional) `boolean` defaults to `true`

Years are displayed in descending order by default (largest first). Set to `false` to display in ascending order.

### `years`

(optional) `[number, number]` defaults to `[1900, new Date().getFullYear()]`

Takes a tuple where the first value is the start year and the second values is the end year users can pick from.

Example:

```js
years={[2000, 2026]}
```

### `smartMode`

(optional) `boolean` defaults to `false`

Enables flexible date selection with several behaviors:

- **Ping-pong selection:** Clicks alternate between setting the start and end date regardless of which calendar side is clicked. A "Selecting From" / "Selecting To" indicator shows which date will be set next.
- **Auto-swap invalid ranges:** When a selection (cell click or typed input) would make start after end, the other date is automatically adjusted by one day. Without `smartMode`, such selections are rejected.
- **Same-month calendar offset:** When both dates fall in the same month and year, the right calendar shifts forward one month to always show two different months. (Use `pastSearchFriendly` to shift the left calendar back instead.)
- **Relaxed cell constraints:** Without `smartMode`, cells outside the current range are greyed out and unclickable. With `smartMode`, all cells are clickable and auto-swap handles any conflicts.

### `pastSearchFriendly`

(optional) `boolean` defaults to `false`

**Note:** Requires `smartMode` to be enabled.

Modifies the same-month calendar offset behavior of `smartMode`. When both dates are in the same month and year, the left calendar shifts back one month (showing the previous month) instead of the right calendar shifting forward. This is useful for searching backward in time, as the current month stays on the right with the previous month visible on the left.

### `noMobileMode`

(optional) `boolean` defaults to `false`

When set the mobile breakpoint to be ignored. Picker will always be displayed in full screen mode.

### `forceMobileMode`

(optional) `boolean` defaults to `false`

When set the mobile breakpoint to be ignored. Picker will always be displayed in condensed mode all the time.

### `twelveHoursClock`

(optional) `boolean` defaults to `false`

When enabled, the picker will display time values in a 12-hour format rather than a 24-hour format.

### `standalone`

(optional) `boolean` defaults to `false`

When set the picker will be open by default.

### `leftMode`

(optional) `boolean` defaults to `false`

When set and changed the picker will open to the left (right to left) instead of the default which is to open to the right (left to right)

### `centerMode`

(optional) `boolean` defaults to `false`

To allow flexibility, center mode has been added where leftMode or default is not enough.

### `displayMinDate`

(optional) `boolean` defaults to `false`

When set, the minimum date will be displayed in the picker footer.

### `displayMaxDate`

(optional) `boolean` defaults to `false`

When set, the maximum date will be displayed in the picker footer.

### `classNames`

(optional) `object`

Will add extra classNames to different parts of the picker. It's great for for tailoring the component to match your preferred look and feel. The object has the following keys:

- `rootContainer`
- `rangesContainer`
- `rangeButtonDefault`
- `rangeButtonSelected`
- `fromToRangeContainer`
- `normalCell`
- `normalCellHover`
- `greyCell`
- `invalidCell`
- `startCell`
- `endCell`
- `withinRangeCell`
- `startDot`
- `endDot`
- `footerContainer`
- `applyButton`
- `cancelButton`

By providing CSS `className`(s) for these keys, you can customize/override them.

**Note:** If you're already using TailwindCSS in your project, you can use the `!` operand for overriding an already exisiting className. (Just like `!important` in regular CSS) For example:

```tsx
classNames={{
  rootContainer: 'bg-red-700!'
}}
```

The following illustration shows the different components of the picker which can be customized:

![Date Time Picker Components Illustration](https://raw.githubusercontent.com/mohsentaleb/react-tailwindcss-datetimepicker/master/public/date-picker-illustration.png)

### `theme`
All standard Tailwind CSS v4 named colors are available as themes:

**Chromatic**
- `sky` (Default)
- `blue` (alias for `sky`, kept for backward compatibility)
- `orange`
- `emerald`
- `green` (alias for `emerald`, kept for backward compatibility)
- `purple`
- `red`
- `amber`
- `yellow`
- `lime`
- `teal`
- `cyan`
- `indigo`
- `violet`
- `fuchsia`
- `pink`
- `rose`

**Gray scale**
- `slate`
- `gray`
- `zinc`
- `neutral`
- `stone`

## Development

Runs the app in the development mode.

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**Hot module reloading** is enabled in dev mode.

## Production

```
npm run build
```

Builds the app for production to the `/dist` folder using vite's [library mode](https://vitejs.dev/guide/build.html#library-mode). Type declarations (`index.d.ts`) are also created in the same directory.

## Migration

### from `2.x.x to ` to `3.x.x`:

- [`Moment`](https://momentjs.com/) has been removed from the dependencies. Now you can use any date library (or even vanilla js) to construct your date objects. See [`ranges`](#ranges).

### From `1.x.x to ` to `2.x.x`:

- `local` prop has been renamed to [`locale`](#locale) and it's now an **optional** prop.
- `style` prop has been removed in favor of [`classNames`](#classnames).
- `darkMode` prop has been removed. All UI elements of the picker now have dark styles defined for them. If you add `className=dark` to your `<body>` tag (or any other parent element of it), dark mode will be automatically turned on.

## Roadmap

- [x] Support TypeScript
- [x] Ability to add custom CSS classes for different parts of the component
- [x] Migrate to [date-fns](https://www.npmjs.com/package/date-fns)
- [x] Adding predefined themes
- [x] Write tests
- [ ] More demos showcasing different props

## Get Help

- 💬 [Discussion forums](https://github.com/mohsentaleb/react-tailwindcss-datetimepicker/discussions) - Get support and share your experience.
- 🪳 [Report an issue](https://github.com/mohsentaleb/react-tailwindcss-datetimepicker/issues/new/choose) - Report bugs or request features.

## License

[MIT](https://github.com/mohsentaleb/react-tailwindcss-datetimepicker/blob/master/LICENSE.md)

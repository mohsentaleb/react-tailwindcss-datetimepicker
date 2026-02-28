import React from 'react';

import clsx from 'clsx';

import type { ClassNames, Locale, Mode } from '../types';

interface Props {
  mode: Mode;
  selectingModeFrom: boolean;
  smartMode?: boolean;
  locale?: Locale;
  classNames?: ClassNames;
}
export default class ActiveNotifier extends React.Component<Props> {
  getDotDiv(text: string, classNames: string, id: string) {
    return (
      <div className="activeNotifier flex items-center justify-center" id={id} aria-live="polite">
        {text} <span className={clsx('ml-2 inline-block h-3 w-3 rounded-full', classNames)} aria-hidden="true" />
      </div>
    );
  }

  render() {
    const selectingModeFrom = this.props.selectingModeFrom;
    const mode = this.props.mode;
    const startDotStyle = clsx('bg-emerald-500', this.props.classNames?.startDot);

    const endDotStyle = clsx('bg-red-600', this.props.classNames?.endDot);
    const startNotifierID = 'startNotifierID';
    const endNotifierID = 'endNotifierID';
    const locale = this.props.locale;
    if (this.props.smartMode) {
      if (selectingModeFrom && mode === 'start') {
        const label = locale && locale.selectingFrom ? locale.selectingFrom : 'Selecting From';
        return this.getDotDiv(`${label} `, startDotStyle, startNotifierID);
      } else if (!selectingModeFrom && mode === 'end') {
        const label = locale && locale.selectingTo ? locale.selectingTo : 'Selecting To';
        return this.getDotDiv(`${label} `, endDotStyle, endNotifierID);
      }
    } else {
      if (mode === 'start') {
        const label = locale && locale.fromDate ? locale.fromDate : 'From Date';
        return this.getDotDiv(`${label} `, startDotStyle, startNotifierID);
      } else if (mode === 'end') {
        const label = locale && locale.toDate ? locale.toDate : 'To Date';
        return this.getDotDiv(`${label} `, endDotStyle, endNotifierID);
      }
    }
    return <div />;
  }
}

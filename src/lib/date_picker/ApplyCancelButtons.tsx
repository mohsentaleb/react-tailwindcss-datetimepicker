import React, { KeyboardEvent } from 'react';

import clsx from 'clsx';
import { format } from 'date-fns';

import { defaultDateFormat } from '../DateTimeRangePicker';
import { defaultTheme } from '../ReactDateTimePicker';
import { applyButtonClasses } from '../utils/themeClasses';

import type { ClassNames, Locale, Theme } from '../types';

interface Props {
  locale?: Locale;
  minDate?: Date;
  maxDate?: Date;
  applyCallback: () => void;
  changeVisibleState: () => void;
  autoApply?: boolean;
  standalone?: boolean;
  displayMinDate?: boolean;
  displayMaxDate?: boolean;
  classNames?: ClassNames;
  theme?: Theme;
}

export default class ApplyCancelButtons extends React.Component<Props> {
  cancelPressed = () => {
    this.props.changeVisibleState();
  };

  applyPressed = () => {
    this.props.applyCallback();
  };

  isSpaceBarOrEnterPressed(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      return true;
    }
    return false;
  }

  applyOnKeyPress = (e: KeyboardEvent) => {
    if (this.isSpaceBarOrEnterPressed(e)) {
      this.props.applyCallback();
    }
  };

  cancelOnKeyPress = (e: KeyboardEvent) => {
    if (this.isSpaceBarOrEnterPressed(e)) {
      this.props.changeVisibleState();
    }
  };

  getMinDateBox() {
    if (this.props.minDate) {
      const label = this.props.locale?.minDate || 'Min Date';
      return (
        <div className="maxDateLabel p-2 text-xs">
          {label}: {format(this.props.minDate, this.props.locale?.format || defaultDateFormat)}
        </div>
      );
    }
  }

  getMaxDateBox() {
    if (this.props.maxDate) {
      const label = this.props.locale?.maxDate || 'Max Date';
      return (
        <div className="maxDateLabel p-2 text-xs">
          {label}: {format(this.props.maxDate, this.props.locale?.format || defaultDateFormat)}
        </div>
      );
    }
  }

  renderButtons = () => {
    let applyButton;
    let closeButtonText = this.props.locale?.close || 'Close';
    const theme = this.props.theme || defaultTheme;

    if (!this.props.autoApply) {
      applyButton = (
        <button
          className={clsx(
            'applyButton inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm',
            applyButtonClasses[theme],
            this.props.classNames?.applyButton
          )}
          type="button"
          onClick={this.applyPressed}
          onKeyDown={this.applyOnKeyPress}
          tabIndex={0}
        >
          {this.props.locale?.apply || 'Apply'}
        </button>
      );
      closeButtonText = this.props.locale?.cancel || 'cancel';
    }
    const closeButton = (
      <button
        id="datepicker-cancel-button"
        className={clsx(
          'mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-transparent dark:bg-slate-500 dark:text-white dark:hover:dark:bg-slate-400 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm',
          this.props.classNames?.cancelButton
        )}
        type="button"
        onClick={this.cancelPressed}
        onKeyDown={this.cancelOnKeyPress}
        tabIndex={0}
      >
        {closeButtonText}
      </button>
    );

    return (
      <>
        {applyButton}
        {!this.props.standalone ? closeButton : null}
      </>
    );
  };

  render() {
    return (
      <div
        id="datepicker-footer"
        className={clsx(
          'rounded-b bg-gray-50 p-3 dark:bg-slate-600 sm:flex sm:flex-row-reverse sm:items-center',
          {
            'float-right': this.props.standalone,
          },
          this.props.classNames?.footerContainer
        )}
      >
        {this.renderButtons()}
        {this.props.displayMaxDate && this.getMaxDateBox()}
        {this.props.displayMinDate && this.getMinDateBox()}
      </div>
    );
  }
}

/* eslint-disable react-refresh/only-export-components */
import React from 'react';

import {
  format,
  isSameDay,
  isEqual,
  getYear,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  getSeconds,
  addMinutes,
  parse,
  isValid,
  isBefore,
  isAfter,
  addDays,
  subDays,
  isSameMinute,
  subMinutes,
} from 'date-fns';

import ApplyCancelButtons from './date_picker/ApplyCancelButtons';
import DatePicker from './date_picker/DatePicker';
import Ranges from './ranges/Ranges';
import { beforeMinDate, datePicked, pastMaxDate } from './utils/DateSelectedUtils';
import { isValidTimeChange } from './utils/TimeFunctionUtils';

import type { Locale, Mode, PresetDateRanges, ClassNames, Theme } from './types';

export const ModeEnum = Object.freeze({ start: 'start', end: 'end' });
export const defaultDateFormat = 'dd-MM-yyyy HH:mm';

interface Props {
  ranges?: PresetDateRanges;
  start: Date;
  end: Date;
  locale?: Locale;
  applyCallback: (start: Date, end: Date) => void;
  rangeCallback?: (index: number, value: keyof PresetDateRanges) => void;
  autoApply?: boolean;
  minDate?: Date;
  maxDate?: Date;
  descendingYears?: boolean;
  years?: [number, number];
  pastSearchFriendly?: boolean;
  smartMode?: boolean;
  changeVisibleState: () => void;
  noMobileMode?: boolean;
  forceMobileMode?: boolean;
  standalone?: boolean;
  twelveHoursClock?: boolean;
  selectedRange?: number;
  classNames?: ClassNames;
  displayMinDate?: boolean;
  displayMaxDate?: boolean;
  theme?: Theme;
}

interface State {
  selectedRange: number;
  selectingModeFrom: boolean;
  ranges: PresetDateRanges;
  start: Date;
  startLabel: string;
  end: Date;
  endLabel: string;
  focusDate: boolean | Date;
  dateFormat: string;
}

class DateTimeRangePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const ranges = {} as PresetDateRanges;
    const propsRanges = this.props.ranges ?? {};
    if (Object.keys(propsRanges).length > 0) {
      Object.assign(ranges, propsRanges, { 'Custom Range': 'Custom Range' });
    }
    let dateFormat = `dd-MM-yyyy ${this.props.twelveHoursClock ? 'h:mm a' : 'HH:mm'}`;

    if (this.props.locale?.format) {
      dateFormat = this.props.locale.format;
    }

    this.state = {
      selectedRange: this.props.selectedRange || 0,
      selectingModeFrom: true,
      ranges,
      start: this.props.start,
      startLabel: format(this.props.start, dateFormat),
      end: this.props.end,
      endLabel: format(this.props.end, dateFormat),
      focusDate: false,
      dateFormat,
    };
  }

  componentDidMount() {
    this.setToRangeValue(this.state.start, this.state.end);
  }

  componentDidUpdate(prevProps: Props) {
    const isDifferentMomentObject =
      !isEqual(this.props.start, prevProps.start) || !isEqual(this.props.end, prevProps.end);
    const isDifferentTime =
      format(this.props.start, 'dd-MM-yyyy HH:mm') !== format(prevProps.start, 'dd-MM-yyyy HH:mm') ||
      format(this.props.end, 'dd-MM-yyyy HH:mm') !== format(prevProps.end, 'dd-MM-yyyy HH:mm');
    if (isDifferentMomentObject || isDifferentTime) {
      this.setState(
        {
          start: this.props.start,
          end: this.props.end,
        },
        () => this.updateStartEndAndLabels(this.props.start, this.props.end, true)
      );
    }

    if (this.props.ranges !== prevProps.ranges) {
      const ranges = {} as PresetDateRanges;
      const propsRanges = this.props.ranges ?? {};
      if (Object.keys(propsRanges).length > 0) {
        Object.assign(ranges, propsRanges, { 'Custom Range': 'Custom Range' });
      }
      this.setState({ ranges });
    }
  }

  applyCallback = () => {
    this.props.applyCallback(this.state.start, this.state.end);
    this.props.changeVisibleState();
  };

  checkAutoApplyActiveApplyIfActive(startDate: Date, endDate: Date) {
    if (this.props.autoApply) {
      this.props.applyCallback(startDate, endDate);
    }
  }

  rangeSelectedCallback = (index: number, value: keyof PresetDateRanges) => {
    // If Past Max Date Dont allow update
    let start = this.state.start;
    let end = this.state.end;

    if (value !== 'Custom Range') {
      start = this.state.ranges[value][0];
      end = this.state.ranges[value][1];
      if (pastMaxDate(start, this.props.maxDate, true) || pastMaxDate(end, this.props.maxDate, true)) {
        return false;
      }
      if (beforeMinDate(start, this.props.minDate, true) || beforeMinDate(end, this.props.minDate, true)) {
        return false;
      }
    }
    // Else update state to new selected index and update start and end time
    this.setState({ selectedRange: index });
    if (value !== 'Custom Range') {
      this.updateStartEndAndLabels(start, end);
    }
    if (this.props.rangeCallback) {
      this.props.rangeCallback(index, value);
    }

    if (value !== 'Custom Range') {
      this.checkAutoApplyActiveApplyIfActive(start, end);
    }
  };

  setToRangeValue(startDate: Date, endDate: Date) {
    const rangesArray = Object.values(this.state.ranges);

    for (let i = 0; i < rangesArray.length; i++) {
      const currentRange = rangesArray[i];

      if (currentRange === 'Custom Range') {
        continue;
      } else if (Array.isArray(currentRange)) {
        if (isSameMinute(currentRange[0], startDate) && isSameMinute(currentRange[1], endDate)) {
          this.setState({ selectedRange: i });
          return;
        }
      }
    }
    this.setToCustomRange();
  }

  setToCustomRange() {
    const rangesArray = Object.values(this.state.ranges);

    for (let i = 0; i < rangesArray.length; i++) {
      if (rangesArray[i] === 'Custom Range') {
        this.setState({ selectedRange: i });
      }
    }
  }

  updateStartEndAndLabels(newStart: Date, newEnd: Date, updateCalendar?: boolean) {
    this.setState(
      {
        start: newStart,
        startLabel: format(newStart, this.state.dateFormat),
        end: newEnd,
        endLabel: format(newEnd, this.state.dateFormat),
      },
      () => {
        if (updateCalendar) {
          this.updateCalendarRender();
        }
      }
    );
  }

  updateCalendarRender() {
    this.dateTextFieldCallback('start');
    this.dateTextFieldCallback('end');
  }

  // Currently called from Cell selection
  dateSelectedNoTimeCallback = (cellDate: Date, cellMode: Mode) => {
    // If in smart mode get the new date selecting mode from the selectingMode (Changes between too and from)
    // If in non smart mode take the new date selecting mode from the callback mode param
    let isSelectingModeFrom;
    if (this.props.smartMode) {
      isSelectingModeFrom = this.state.selectingModeFrom;
    } else if (cellMode === 'start') {
      isSelectingModeFrom = true;
    } else {
      isSelectingModeFrom = false;
    }

    // Get the new dates from the dates selected by the user
    const newDates = datePicked(this.state.start, this.state.end, cellDate, isSelectingModeFrom, this.props.smartMode);

    // unpack the new dates and set them
    const startDate = newDates.startDate;
    const endDate = newDates.endDate;
    const newStart = this.duplicateMomentTimeFromState(startDate, true);
    const newEnd = this.duplicateMomentTimeFromState(endDate, false);

    this.updateStartEndAndLabels(newStart, newEnd);
    this.setToRangeValue(newStart, newEnd);
    // If Smart Mode is active change the selecting mode to opposite of what was just pressed
    if (this.props.smartMode) {
      this.setState((prevState) => ({
        selectingModeFrom: !prevState.selectingModeFrom,
      }));
    }
    this.checkAutoApplyActiveApplyIfActive(newStart, newEnd);
  };

  changeSelectingModeCallback = (selectingModeFromParam: boolean) => {
    if (this.props.smartMode) {
      this.setState({ selectingModeFrom: selectingModeFromParam });
    }
  };

  duplicateMomentTimeFromState(date: Date, startDate: boolean) {
    let state;
    if (startDate) {
      state = this.state.start;
    } else {
      state = this.state.end;
    }
    return new Date(
      getYear(date),
      getMonth(date),
      getDate(date),
      getHours(state),
      getMinutes(state),
      getSeconds(state)
    );
  }

  timeChangeCallback = (newHour: number, newMinute: number, mode: Mode) => {
    if (mode === 'start') {
      this.updateStartTime(newHour, newMinute, mode);
    } else if (mode === 'end') {
      this.updateEndTime(newHour, newMinute, mode);
    }
  };

  updateStartTime(newHour: number, newMinute: number, mode: Mode) {
    this.updateTime(this.state.start, newHour, newMinute, mode, 'start');
  }

  updateEndTime(newHour: number, newMinute: number, mode: Mode) {
    this.updateTime(this.state.end, newHour, newMinute, mode, 'end');
  }

  updateTime(origDate: Date, newHour: number, newMinute: number, mode: Mode, stateDateToChangeName: Mode) {
    const date = new Date(origDate);
    date.setHours(newHour);
    date.setMinutes(newMinute);

    // If Past Max Date Dont allow update
    if (pastMaxDate(date, this.props.maxDate, true)) {
      return false;
    }
    if (beforeMinDate(date, this.props.minDate, true)) {
      return false;
    }
    // If Valid Time Change allow the change else if in smart mode
    // set new start and end times to be minute ahead/behind the new date
    // else dont allow the change
    if (isValidTimeChange(mode, date, this.state.start, this.state.end)) {
      if (stateDateToChangeName === 'start') {
        this.setState({
          start: date,
          startLabel: format(date, this.state.dateFormat),
        });
      } else {
        this.setState({
          end: date,
          endLabel: format(date, this.state.dateFormat),
        });
      }

      this.updateTimeCustomRangeUpdator(stateDateToChangeName, date);
      if (stateDateToChangeName === 'end') {
        this.checkAutoApplyActiveApplyIfActive(this.state.start, date);
      } else {
        this.checkAutoApplyActiveApplyIfActive(date, this.state.end);
      }
    } else if (this.props.smartMode) {
      if (mode === 'start') {
        const newDate = addMinutes(date, 1);
        this.updateStartEndAndLabels(date, newDate);
        this.setToRangeValue(date, newDate);
        this.checkAutoApplyActiveApplyIfActive(date, newDate);
      } else {
        const newDate = subMinutes(date, 1);
        this.updateStartEndAndLabels(newDate, date);
        this.setToRangeValue(newDate, date);
        this.checkAutoApplyActiveApplyIfActive(newDate, date);
      }
    } else {
      this.updateStartEndAndLabels(this.state.start, this.state.end);
      this.setToRangeValue(this.state.start, this.state.end);
      this.checkAutoApplyActiveApplyIfActive(this.state.start, this.state.end);
    }
  }

  updateTimeCustomRangeUpdator(stateDateToChangeName: Mode, date: Date) {
    if (stateDateToChangeName === 'start') {
      this.setToRangeValue(date, this.state.end);
    } else {
      this.setToRangeValue(this.state.start, date);
    }
  }

  dateTextFieldCallback = (mode: Mode) => {
    if (mode === 'start') {
      const newDate = parse(this.state.startLabel, this.state.dateFormat, new Date());
      const isValidNewDate = isValid(newDate);
      const isAfterEndDate = isAfter(newDate, this.state.end);
      const isSameOrBeforeEnd = isEqual(newDate, this.state.end) || isBefore(newDate, this.state.end);
      this.updateDate(mode, newDate, isValidNewDate, isSameOrBeforeEnd, isAfterEndDate, 'start');
    } else {
      const newDate = parse(this.state.endLabel, this.state.dateFormat, new Date());
      const isValidNewDate = isValid(newDate);
      const isBeforeStartDate = isBefore(newDate, this.state.start);
      const isSameOrAfterStartDate = isEqual(newDate, this.state.start) || isAfter(newDate, this.state.start);
      this.updateDate(mode, newDate, isValidNewDate, isSameOrAfterStartDate, isBeforeStartDate, 'end');
    }
  };

  updateDate(
    mode: Mode,
    newDate: Date,
    isValidNewDate: boolean,
    isValidDateChange: boolean,
    isInvalidDateChange: boolean,
    stateDateToChangeName: Mode
  ) {
    // If new date past max date dont allow change
    if (pastMaxDate(newDate, this.props.maxDate, true)) {
      this.updateStartEndAndLabels(this.state.start, this.state.end);
      return false;
    }
    if (beforeMinDate(newDate, this.props.minDate, true)) {
      this.updateStartEndAndLabels(this.state.start, this.state.end);
      return false;
    }
    // Else if date valid and date change valid update the date,
    if (isValidNewDate && isValidDateChange) {
      if (stateDateToChangeName === 'start') {
        this.setState({
          start: newDate,
          startLabel: format(newDate, this.state.dateFormat),
        });
      } else {
        this.setState({
          end: newDate,
          endLabel: format(newDate, this.state.dateFormat),
        });
      }
      this.updateTimeCustomRangeUpdator(stateDateToChangeName, newDate);
      if (stateDateToChangeName === 'end') {
        this.checkAutoApplyActiveApplyIfActive(this.state.start, newDate);
      } else {
        this.checkAutoApplyActiveApplyIfActive(newDate, this.state.end);
      }
    }
    // If new date valid but date change invalid go into update invalid mode,
    // adds/subtract 1 days from start/stop value
    // Only do this if in smart mode though
    else if (isValidNewDate && isInvalidDateChange && this.props.smartMode) {
      this.updateInvalidDate(mode, newDate);
    } else {
      this.updateStartEndAndLabels(this.state.start, this.state.end);
    }
  }

  updateInvalidDate(mode: Mode, newDate: Date) {
    if (mode === 'start') {
      const newEndDate = addDays(newDate, 1);
      this.updateLabelsAndRangeValues(newDate, newEndDate);
      this.checkAutoApplyActiveApplyIfActive(newDate, newEndDate);
    } else {
      const newStartDate = subDays(newDate, 1);
      this.updateStartEndAndLabels(newStartDate, newDate);
      this.checkAutoApplyActiveApplyIfActive(newStartDate, newDate);
    }
  }

  updateLabelsAndRangeValues(startDate: Date, endDate: Date) {
    this.updateStartEndAndLabels(startDate, endDate);
    this.setToRangeValue(startDate, endDate);
  }

  onChangeDateTextHandlerCallback = (newValue: string, mode: Mode) => {
    if (mode === 'start') {
      this.setState({
        startLabel: newValue,
      });
    } else if (mode === 'end') {
      this.setState({
        endLabel: newValue,
      });
    }
  };

  keyboardCellCallback = (originalDate: Date, newDate: Date) => {
    let startDate;
    let endDate;
    // If original date same as start and end date, and not in smart mode
    // Then if cell end called allow new end date. Allow new start if cell start called
    // Done for when the start and end date are the same
    if (isSameDay(originalDate, this.state.start) && isSameDay(originalDate, this.state.end) && !this.props.smartMode) {
      const activeElement = document.activeElement?.id;
      // If Focused Cell is an end cell
      if (activeElement && activeElement.includes('_cell_') && activeElement.includes('_end')) {
        // Allow a new end date from the date calledback
        startDate = new Date(this.state.start);
        endDate = this.duplicateMomentTimeFromState(newDate, false);
        // EDGE CASE: Due to Cell focusing issues if Start and End date same
        // due to Key press into each other, if you then press left it always
        // calls it from the end cell so allow the end cell to handle this
        // and switch to start when this occurs
        if (!isBefore(startDate, endDate) && !isEqual(startDate, endDate)) {
          startDate = this.duplicateMomentTimeFromState(newDate, true);
          endDate = new Date(this.state.end);
        }
      } else if (activeElement && activeElement.includes('_cell_') && activeElement.includes('_start')) {
        startDate = this.duplicateMomentTimeFromState(newDate, true);
        endDate = new Date(this.state.end);
      }
    }

    if (!startDate && !endDate) {
      // If original is the start date only, then set the start date to the new date
      if (isSameDay(originalDate, this.state.start)) {
        startDate = this.duplicateMomentTimeFromState(newDate, true);
        endDate = new Date(this.state.end);
        // Not in Smart Mode and Start Date after End Date then invalid change
        if (!this.props.smartMode && isAfter(startDate, endDate)) {
          return false;
        }
      }
      // End date only, set the end date to the new date
      else {
        startDate = new Date(this.state.start);
        endDate = this.duplicateMomentTimeFromState(newDate, false);
        //  Not in Smart Mode and Start Date after End Date then invalid change
        if (!this.props.smartMode && isAfter(startDate, endDate)) {
          return false;
        }
      }
    }

    if (startDate && endDate) {
      if (isBefore(startDate, endDate) || isEqual(startDate, endDate)) {
        this.updateStartEndAndLabels(startDate, endDate);
        this.checkAutoApplyActiveApplyIfActive(startDate, endDate);
      } else {
        this.updateStartEndAndLabels(endDate, startDate);
        this.checkAutoApplyActiveApplyIfActive(endDate, startDate);
      }
    }

    return true;
  };

  focusOnCallback = (date: Date | boolean) => {
    if (date) {
      this.setState({
        focusDate: date,
      });
    } else {
      this.setState({
        focusDate: false,
      });
    }
  };

  cellFocusedCallback = (date: Date) => {
    if (isSameDay(date, this.state.start)) {
      this.changeSelectingModeCallback(true);
    } else if (isSameDay(date, this.state.end)) {
      this.changeSelectingModeCallback(false);
    }
  };

  renderDatePicker(mode: 'start' | 'end', locale?: Locale) {
    const isStart = mode === 'start';
    const label = isStart
      ? (locale?.fromDate ?? 'From Date')
      : (locale?.toDate ?? 'To Date');
    return (
      <DatePicker
        label={label}
        date={isStart ? this.state.start : this.state.end}
        otherDate={isStart ? this.state.end : this.state.start}
        mode={mode}
        dateSelectedNoTimeCallback={this.dateSelectedNoTimeCallback}
        timeChangeCallback={this.timeChangeCallback}
        dateTextFieldCallback={this.dateTextFieldCallback}
        keyboardCellCallback={this.keyboardCellCallback}
        focusOnCallback={this.focusOnCallback}
        focusDate={this.state.focusDate}
        cellFocusedCallback={this.cellFocusedCallback}
        onChangeDateTextHandlerCallback={this.onChangeDateTextHandlerCallback}
        dateLabel={isStart ? this.state.startLabel : this.state.endLabel}
        selectingModeFrom={this.state.selectingModeFrom}
        changeSelectingModeCallback={this.changeSelectingModeCallback}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        locale={this.props.locale}
        descendingYears={this.props.descendingYears}
        years={this.props.years}
        pastSearchFriendly={this.props.pastSearchFriendly}
        smartMode={this.props.smartMode}
        twelveHoursClock={this.props.twelveHoursClock}
        classNames={this.props.classNames}
        theme={this.props.theme}
      />
    );
  }

  render() {
    const propsRanges = this.props.ranges ?? {};
    const disabledButtons = Object.keys(propsRanges).map(rangeKey => {
      const range = propsRanges[rangeKey];

      if (Array.isArray(range)) {
        const [start, end] = range.map(date => new Date(date));
        const min = this.props.minDate ? new Date(this.props.minDate) : null;
        const max = this.props.maxDate ? new Date(this.props.maxDate) : null;

        if ((max && (pastMaxDate(start, max, true) || pastMaxDate(end, max, true))) ||
          (min && (beforeMinDate(start, min, true) || beforeMinDate(end, min, true)))) {
          return true;
        }
      }

      return false;
    });
    return (
      <>
        <div className="flex flex-col gap-2 p-2 md:flex-row">
          {Object.keys(this.state.ranges).length > 0 && (
            <Ranges
              ranges={this.state.ranges}
              disabledRanges={disabledButtons}
              selectedRange={this.state.selectedRange}
              rangeSelectedCallback={this.rangeSelectedCallback}
              noMobileMode={this.props.noMobileMode}
              forceMobileMode={this.props.forceMobileMode}
              classNames={this.props.classNames}
              theme={this.props.theme}
            />
          )}
          {this.renderDatePicker('start', this.props.locale)}
          {this.renderDatePicker('end', this.props.locale)}
        </div>
        <ApplyCancelButtons
          changeVisibleState={this.props.changeVisibleState}
          applyCallback={this.applyCallback}
          locale={this.props.locale}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          autoApply={this.props.autoApply}
          standalone={this.props.standalone}
          displayMinDate={this.props.displayMinDate}
          displayMaxDate={this.props.displayMaxDate}
          classNames={this.props.classNames}
          theme={this.props.theme}
        />
      </>
    );
  }
}

export default DateTimeRangePicker;

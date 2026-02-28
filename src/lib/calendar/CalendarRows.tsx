import React from 'react';

import { ClassNames, Mode, Theme } from '../types';

import CalendarRow from './CalendarRow';


interface Props {
  date: Date;
  fourtyTwoDays: Date[];
  otherDate: Date;
  minDate?: Date;
  maxDate?: Date;
  dateSelectedNoTimeCallback: (cellDate: Date, cellMode: Mode) => void;
  keyboardCellCallback: (originalDate: Date, newDate: Date) => boolean;
  focusOnCallback: (date: Date | boolean) => void;
  focusDate: boolean | Date;
  cellFocusedCallback: (date: Date) => void;
  year: number;
  month: number;
  mode: Mode;
  smartMode?: boolean;
  classNames?: ClassNames;
  theme?: Theme;
}

export default class CalendarRows extends React.Component<Props> {
  generateDays() {
    const calendarRows = [];
    for (let i = 0; i < 6; i++) {
      const startIndex = i * 7;
      const endIndex = (i + 1) * 7;
      const rowDays = this.props.fourtyTwoDays.slice(startIndex, endIndex);
      calendarRows.push(
        <CalendarRow
          key={i}
          row={i}
          rowDays={rowDays}
          date={this.props.date}
          otherDate={this.props.otherDate}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          month={this.props.month}
          year={this.props.year}
          dateSelectedNoTimeCallback={this.props.dateSelectedNoTimeCallback}
          keyboardCellCallback={this.props.keyboardCellCallback}
          focusOnCallback={this.props.focusOnCallback}
          focusDate={this.props.focusDate}
          cellFocusedCallback={this.props.cellFocusedCallback}
          mode={this.props.mode}
          smartMode={this.props.smartMode}
          classNames={this.props.classNames}
          theme={this.props.theme}
        />
      );
    }
    return calendarRows;
  }

  render() {
    const calendarRows = this.generateDays();
    return <div>{calendarRows}</div>;
  }
}

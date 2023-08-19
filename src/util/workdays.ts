import { DateManager, DateOrPeriod, HolidaySettings } from '../date/date-manager';
import { WorkdayScheduler } from '../date/workday-scheduler';
import { formatDate } from './html-util';

export function workdays() {
  // 祝日のリスト
  const holidays: DateOrPeriod[] = [
    '2023-01-01',
    '2023-01-02',
    '2023-01-09',
    '2023-02-11',
    '2023-02-23',
    '2023-03-21',
    '2023-04-29',
    '2023-05-03',
    '2023-05-04',
    '2023-05-05',
    '2023-07-17',
    '2023-08-11',
    '2023-09-18',
    '2023-09-23',
    '2023-10-09',
    '2023-11-03',
    '2023-11-23',
  ];

  // 会社指定休日
  const companyHolidays: DateOrPeriod[] = [{ start: '2023-04-29', end: '2023-05-07' }];

  // 会社指定出勤日
  const companyWorkdays: DateOrPeriod[] = [];

  // 既定の休日（土曜日と日曜日）
  const regularDaysOff = [0, 6];

  // HolidaySettingsオブジェクトを作成
  const holidaySettings: HolidaySettings = {
    holidays,
    companyHolidays,
    companyWorkdays,
    regularDaysOff,
  };

  // DateManagerクラスのインスタンスを作成
  const dateManager = new DateManager(holidaySettings);
  const baseDate = new Date('2023-05-05');
  // 使用例
  const currentDate = new Date('2023-05-05');

  // 5営業日後の日付を計算
  const dateAfter5Workdays = dateManager.calculateWorkday(currentDate, 5);
  console.log(`5営業日後の日付: ${dateAfter5Workdays.toISOString().slice(0, 10)}`);

  // 3営業日前の日付を計算
  const dateBefore3Workdays = dateManager.calculateWorkday(currentDate, -3);
  console.log(`3営業日前の日付: ${dateBefore3Workdays.toISOString().slice(0, 10)}`);

  // 本日が指定日時から何日経過しているかを算出
  const daysSince = dateManager.daysSince(new Date('2023-04-29'));
  console.log(`指定日時から経過した日数: ${daysSince}`);

  // 次の休日までの日数を算出
  const daysUntilNextHoliday = dateManager.daysUntilNextHoliday(currentDate);
  console.log(`次の休日までの日数: ${daysUntilNextHoliday}`);

  // 前回の休日からの日数を算出
  const daysSinceLastHoliday = dateManager.daysSinceLastHoliday(currentDate);
  console.log(`前回の休日からの日数: ${daysSinceLastHoliday}`);

  const dateAfter6Workdays = dateManager.calculateWorkdayFromDate(baseDate, 6);
  console.log(`5稼働日後の日付: ${dateAfter6Workdays.toISOString().slice(0, 10)}`);

  // baseDateから3稼働日前の日付を計算
  const dateBefore4Workdays = dateManager.calculateWorkdayFromDate(baseDate, -1);
  console.log(`3稼働日前の日付: ${dateBefore4Workdays.toISOString().slice(0, 10)}`);

  const wd = new WorkdayScheduler(dateManager);
  const workday = wd
    .getMonthlyDaysOfWorkdays(1, new Date('2023/1/1'), new Date('2023/12/31'))
    .map(date => formatDate(date, 'yyyy-MM-dd'));
  console.log(workday);
}

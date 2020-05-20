/**
 * @author Tapas Vashi
 */

/**
 * Time Card model
 */
export class TimeCard {
  // public id: number;
  public employeeId: number;
  public weekRange: Date[];
  public timeCard: Week[];
}

/**
 * Week Details
 */
export class Week {
  public timeCardId: number;
  public subProjectId: number;
  public monday: number;
  public tuesday: number;
  public wednesday: number;
  public thursday: number;
  public friday: number;
  public saturday: number;
  public sunday: number;
  public totalHours: number;
  public approvalStatusId: number;
  public hoursTypeId: number;
  public remark: string;
}

/**
 * Staffing-Sheet list model
 */
export class StaffingSheet {
  public id: number;
  public role: string;
  public technology: string;
  public employeeId: Array<number>;
  public employeeName: Array<string>;
  public location: string;
  public billRate: number;
  public weeklyBillableHours: number;
  public payRate: number;
  public hours: number[];
}

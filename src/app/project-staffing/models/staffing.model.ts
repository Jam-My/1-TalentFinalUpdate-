/**
 * @author Bhargav Baleja
 */

/**
 * Role list model
 */
export class Staffing {
    public id: number;
    public staffingId: number;
    public roleId: number;
    public role: string;
    public subProjectId: number;
    public subProjectName: string;
    public technologyId: number;
    public technology: string;
    public employeeId: Array<number>;
    public employeeName: Array<string>;
    public locationId: number;
    public location: string;
    public billRate: number;
    public weeklyBillableHours: number;
    public payRate: number;
    public payCycleId: number;
    public payCycle: string;
  }

/**
 * Report Model
 */
export class Report {
    public id: number;
    public subProjectId: number;
    public subProjectName: string;
    public employeeId: number;
    public employeeName: string;
    public totalHours: number;
    public approvalStatusId: number;
    public approvalStatus: string;
    public remark: string;
    public weekRange: Date[];
}
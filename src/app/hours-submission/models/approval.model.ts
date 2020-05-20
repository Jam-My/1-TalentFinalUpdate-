export class Approval {
    public id: number;
    public timeCardId: number;
    public employeeId: number;
    public employeeName: string;
    public hoursTypeId: number;
    public hoursType: string;
    public subProjectId: number;
    public approvalStatusId: number;
    public subProjectName: string;
    public approvalStatus: string;
    public totalHours: number;
    public remark: string;
    public weekRange: Date[];
    public checked: boolean;
}
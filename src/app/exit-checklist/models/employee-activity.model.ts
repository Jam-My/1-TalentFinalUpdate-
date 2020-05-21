export class EmployeeActivity {
    constructor(
        public activityId?: number,
        public employeeName?: string,
        public approvedRelievingDate?: Date,
        public initiatedOn?: Date,
        public activity?: string,
        public domain?: string,
        public assignedTo?: string,
        public statusId?: number,
        public description?: string,
        public statusName?: string
    ) { }
}

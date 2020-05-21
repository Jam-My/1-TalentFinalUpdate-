export class MyActivity {
    //TODO add assigned Activity model as a list
    constructor(
        public activityName?: string,
        public approvedRelievingDate?: Date,
        public assignedTo?: string,
        public domainName?: string,
        public employeeName?: string,
        public exitActivityId?: number,
        public initiatedOn?: Date,
        public lastUpdatedOn?: Date,
        public resignationId?: number,
        public status?: number,
        public statusName?: string,

    ) { }
}

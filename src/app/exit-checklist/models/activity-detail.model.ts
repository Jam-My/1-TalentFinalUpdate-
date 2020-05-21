/**
 * ActivityDetails
 */
export class ActivityDetails {
    constructor(
        public resignationId?: number,
        public exitActivityId?: number,
        public employeeName?: string,
        public approvedRelievingDate?: Date,
        public initiatedOn?: Date,
        public activityName?: string,
        public domainName?: string,
        public description?: string,
        public assignedName?: string,
        public status?: number,
        public remarks?: string[],
        public statusName?:string
    ) { }
}
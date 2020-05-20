export class StatusResponse {
    constructor(
        public resignationId?: number,
        public exitActivityId?: number,
        public remarks?: string,
        public activityStatus?: number
    ) { }
}
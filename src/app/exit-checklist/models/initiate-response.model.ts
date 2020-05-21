export class InitiateResponse {
    constructor(
        public activityId?: string,
        public assignedToId?: number,
        public resignationId?: number
    ) { }
}
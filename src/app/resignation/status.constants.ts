/**
 * STATUS
 */
/*
export enum STATUS {
    INITIATED = 'Initiated',
    ACCEPTEDRM = "Accepted by RM",
    ACCEPTEDHR = 'Accepted by HR',
    REJECTEDRM = 'Rejected by RM',
    REJECTEDHR = 'Rejected by HR',
    REVOKED = 'Revoked',
}
*/

/**
 * STATUS RESIGNATION MODULE
 */
export enum STATUS {
    Initiated = 1,
    AcceptedByRM = 2,
    RejectedByRM = 3,
    Revoked = 4,
    AcceptedByHR = 5,
    RejectedByHR = 6,
    Closed = 7,
    NotStarted = 8,
    InProgress = 9,
    Completed = 10
}

/**
 * STATUSSHOW
 */
export enum STATUSSHOW {
    'Initiated' = 1,
    'Accepted By RM',
    'Rejected By RM',
    'Revoked',
    'Accepted By HR',
    'Rejected By HR',
    'Closed',
    'Not Started',
    'In Progress',
    'Completed '
}
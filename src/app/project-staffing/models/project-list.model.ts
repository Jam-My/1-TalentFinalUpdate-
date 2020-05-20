/**
 * @author Dhruvit Makadia
 */

import { Staffing } from './staffing.model';

/**
 * Project list model
 */
export class ProjectList {
    public subProjectId: number;
    public projectId: number;
    public projectName: string;
    public subProjectName: string;
    public clientId: number;
    public clientName: string;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public totalHours: number;
    public projectValue: number;
    public hoursApproverId: number[];
    public projectManager: string;
    public roleList:Staffing[];
    public submittedHours: number;
}

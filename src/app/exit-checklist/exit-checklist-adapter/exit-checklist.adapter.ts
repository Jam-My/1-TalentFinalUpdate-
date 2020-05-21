import { Adapter } from 'src/app/core/adapter/adapter';
import { MyActivity } from '../models/my-activity.model';
import { AssignedActivity } from '../models/assigned-activity.model';
import { STATUSSHOW, STATUS } from '../status.constants';
import { ActivityDetails } from '../models/activity-detail.model';
import { EmployeeActivity } from '../models/employee-activity.model';

// tslint:disable-next-line: completed-docs
export class MyActivityAdpater implements Adapter<MyActivity[]> {

    public toRequest?(myActivity: MyActivity[]): MyActivity[] {
        return null;
    }

    public toResponse?(myActivity: MyActivity[]): MyActivity[] {
        const activities: AssignedActivity[] = myActivity;
        activities.forEach((activity: MyActivity) => {
            activity.statusName = STATUSSHOW[activity.status];
        });
        return myActivity;
    }
}

// tslint:disable-next-line: completed-docs
export class ActivityDetailsAdapter implements Adapter<ActivityDetails> {

    public toRequest?(activityDetails: ActivityDetails): ActivityDetails {
        return null;
    }

    public toResponse?(activityDetails: ActivityDetails): ActivityDetails {
        if (activityDetails && activityDetails.status) {
            activityDetails.statusName = STATUSSHOW[activityDetails.status];
        }
        return activityDetails;
    }
}


// tslint:disable-next-line: completed-docs
export class EmployeeFeedBackAdapter implements Adapter<EmployeeActivity[]> {

    public toRequest?(employeeActivity: EmployeeActivity[]): EmployeeActivity[] {
        return null;
    }

    public toResponse?(employeeActivity: EmployeeActivity[]): EmployeeActivity[] {
        const activities: EmployeeActivity[] = employeeActivity;
        activities.forEach((activity: EmployeeActivity) => {
            activity.statusName = STATUSSHOW[activity.statusId];
        });
        return employeeActivity;
    }
}
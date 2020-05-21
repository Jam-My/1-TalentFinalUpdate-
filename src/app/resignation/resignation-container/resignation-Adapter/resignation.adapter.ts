
import { Adapter } from 'src/app/core/adapter/adapter';
import { ResignationDetails } from '../../models/resignation-model/resignationDetail.model';
import { STATUSSHOW } from 'src/app/exit-checklist/status.constant';



// tslint:disable-next-line: completed-docs
export class ResignationAdapter implements Adapter<ResignationDetails[]>{
    public toRequest?(resignationDetails: ResignationDetails[]): ResignationDetails[] {
        return null;
    }

    public toResponse?(resignationDetails: ResignationDetails[]): ResignationDetails[] {
        const resignationDetailsList: ResignationDetails[] = resignationDetails;
        resignationDetailsList.forEach((resignationDetail: ResignationDetails) => {
            resignationDetail.status = STATUSSHOW[resignationDetail.status];
        });
        return resignationDetails;
    }
}
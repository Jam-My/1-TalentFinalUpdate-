import { TableProperty } from '../table-property-model/table-property.model';

export class FilterFormData extends TableProperty{
    constructor(public fromDate?: Date,
                public toDate?: Date,
                public domainName?: string,
                public technologyName?: string,
                public designation?: string,
                public resignationStatusId?: number,
                public employeeName?: string,
                public employeeCode?: string,
                ) {
                    super();
                 }

}


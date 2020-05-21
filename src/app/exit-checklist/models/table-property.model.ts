export class TableProperty<T = any> {
    /** pageNumber */
    public pageNumber: number;
    /** pageLimit */
    public pageLimit: number;
    /** sort */
    public sort: string;
    /** order */
    public start: number;
    /** end */
    public end: number;
    /** search */
    public search: string;
    /**  filter */
    public filter: T;
    /** totalRecord */
    public totalRecord: number;
    constructor(pageNumber: number = 1, pageLimit: number = 10) {
        this.pageNumber = pageNumber;
        this.pageLimit = pageLimit;
    }
}
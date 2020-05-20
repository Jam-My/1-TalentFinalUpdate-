export class Params<T = any> {
    /**
     * Page  of params
     */
    public pageNumber: string;
    /**
     * Per page of params
     */
    // public perPage: string;
    public limit: string;
    /**
     * Sort  of params
     */
    public sort: string;
    /**
     * Order  of params
     */
    public order: string;
    /**
     * Start  of params
     */
    public start: string;
    /**
     * End  of params
     */
    public end: string;
    /**
     * Q  of params
     */
    public q: string;
    /**
     * Filter  of params
     */
    public filter: T;
}
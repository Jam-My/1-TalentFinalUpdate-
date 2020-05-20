/* export class TableProperty<T = any> {
    constructor(public pageNumber: number = 1,
        public limit: number = 10,
        public filter: T = null,
        public totalRecord?: number) {
    }
} */

export class TableProperty{

    constructor(public pageNumber: number = 1,
                public limit: number = 10){}

}
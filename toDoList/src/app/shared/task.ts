export interface Task {
    _id: string;                //oder number?
    status: string;
    name: string;
    date: string
}

// hier gebe ich an wie ich Eigenschafte eines Task aus Datenbank lesen kann
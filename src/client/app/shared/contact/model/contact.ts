//Definition of a contact item
export class Contact {
    public isChecked: Boolean;
    constructor(
        public type: String,
        public licensePlate: String,
        public ifMudBed: Boolean,
        public ifBedDown: Boolean,
        public ifFirstVisit: Boolean,
        public total: Number
    ){}
}
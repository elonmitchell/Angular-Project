import { Component, OnInit } from '@angular/core';
import { ContactService, Contact } from '../shared/contact/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  errorMessage: string;
  contacts: Contact[] = [];
  choices: Choices[] = []
  type:String = "Car";
  ifMudBed:Boolean = false;
  ifBedDown:Boolean = false;
  total:Number = 0;
  licensePlate:String;
  ifFirstVisit:Boolean = true;

  /**
   * Creates an instance of the HomeComponent with the injected
   * ContactService.
   *
   * @param {ContactService} contactService - The injected ContactService.
   */
  constructor(public contactService: ContactService) { }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getItems();

    //car choices
    this.carChoices = [{
      text: "Car",
      value: "Car"
    },{
      text: "Truck",
      value: "Truck"
    }]

    //if mud
    this.mudChoices = [{
      text: "true",
      value: true
    },{
      text: "false",
      value: false
    }]

    //if bed down
    this.bedDownChoices = [{
      text: "true",
      value: true
    },{
      text: "false",
      value: false
    }]

    //if get total
    this.getTotal();
  }

  /**
  * Called when items are checked
  */
  checkItem(e: any, contact: Contact) {
    contact.isChecked = e.target.checked;
  }

  getTotal(){
    this.total = (this.type === "Car") ? 5 : 10;
    this.total += (this.ifMudBed) ? 2 : 0;
    this.total /= this.transactionExist(this.licensePlate) ? 1 : 2;
    this.total *= (this.ifBedDown) ? 0 : 1;
  }

  /**
   * Handle the contactService observable
   */
  getItems() {
    this.contactService.get()
      .subscribe(
      contacts => this.contacts = contacts,
      error => this.errorMessage = <any>error
      );
  }

  transactionExist(licenseNumber){
    var contacts = this.contacts.filter(function(contact){
      return contact.licensePlate === licenseNumber;
    });

    this.ifFirstVisit = contacts.length ? false : true;

    return this.ifFirstVisit;
  }


  /**
   * Removes an item from the contact list
   */
  removeItems() {
    let returnContactsArr = this.contactService.removeItems(this.contacts);
    this.contacts = returnContactsArr;
  }

  /**
   * Adds an entry to the contact list
   */
  addEntry() {
    if(!this.licensePlate){
      alert('Please enter the license plate number')
    }
    else if(this.licensePlate !== "1111111" && !this.ifBedDown){
    let contact = new Contact(this.type, this.licensePlate, this.ifMudBed, this.ifBedDown, this.ifFirstVisit, this.total);
    this.contacts.push(contact);
    this.contactService.add(this.contacts);
    this.type = "Car";
    this.ifMudBed = false;
    this.ifBedDown = false;
    this.licensePlate = ""
    this.ifFirstVisit = false;
    this.total = 5;
    }
    else if(this.licensePlate === "1111111"){
      alert('You stole this - we are reporting you to the laws!');
    }
    else if(!this.isBedDown){
      alert('We do not except trasactions when the bed is down.');
    }
  }

}

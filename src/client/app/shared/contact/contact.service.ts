import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Contact } from './model/contact';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the Contacts service with methods to read names and add names.
 */
@Injectable()
export class ContactService {
  localStorageKey: string = "contacts";
  /**
   * Creates a new ContactService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Clears localStorage
   */
  clear() {
    localStorage.clear();
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<Contact[]> {
    return this.http.get('assets/data.json')
                    .map((res: Response) => {
                      if(localStorage.getItem(this.localStorageKey)) {
                        let contactsString = localStorage.getItem(this.localStorageKey);
                        return JSON.parse(contactsString);
                      } else {
                        let json = res.json();
                        let contacts = new Array();
                        for(let item of json) {
                          let contact = new Contact(item.type,
                          item.licensePlate,
                          item.ifMudBed,
                          item.ifBedDown,
                          item.ifFirstVisit,
                          item.total);
                          contacts.push(contact);
                        }
                        localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));
                        return contacts;
                      }
                    })
    //              .do(data => console.log('server data:', data))  // debug
                    .catch(this.handleError);
  }

  add(contacts: Contact[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));
  }

  removeItems(contacts: Contact[]) {
    for(var i = contacts.length -1; i >= 0 ; i--) {
      let contact = contacts[i];
      if(contact.isChecked) {
        contacts.splice(i, 1);
      }
    }

    localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));

    return contacts;
  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}


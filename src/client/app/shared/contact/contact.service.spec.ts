import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';

import { ContactService, Contact } from './index';

export function main() {
  describe('Contact Service', () => {
    let contactService: ContactService;
    let mockBackend: MockBackend;

    beforeEach(() => {

      TestBed.configureTestingModule({
        providers: [
          ContactService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
            deps: [MockBackend, BaseRequestOptions]
          }
        ]
      });
    });

    it('should return an Observable when get called', async(() => {
      expect(TestBed.get(ContactService).get()).toEqual(jasmine.any(Observable));
    }));


    "type": "Car",
    "ifMudBed": false,
    "ifBedDown": false,
    "ifFirstVisit": true,
    "licensePlate": "111",
    "total": 5



    it('should resolve to a contact when get called', async(() => {

      let contactService = TestBed.get(ContactService);
      let mockBackend = TestBed.get(MockBackend);
      contactService.clear();
      mockBackend.connections.subscribe((c: any) => {
        c.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify([{
            "type": 'Car',
            "ifMudBed": false,
            "ifBedDown": false,
            "ifFirstVisit": true,
            "licensePlate": "1143422345"
            "total": 5
          }])})));
      });

      contactService.get().subscribe((data: any) => {
        let contact: Contact = new Contact('Car',false,false,true,"1143422345",5);
        let contactArr = new Array(contact);
        expect(data).toEqual(contactArr);
      });
    }));
  });
}

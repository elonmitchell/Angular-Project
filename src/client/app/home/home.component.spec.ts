import { FormsModule } from '@angular/forms';
import {
  async,
  TestBed
 } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { HomeComponent } from './home.component';
import { ContactService } from '../shared/contact/index';

export function main() {
  describe('Home component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [HomeComponent],
        providers: [
          { provide: ContactService, useValue: new MockContactService() }
        ]
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;
            let mockContactService = <MockContactService>fixture.debugElement.injector.get(ContactService);
            let contactServiceSpy = spyOn(mockContactService, 'get').and.callThrough();

            mockContactService.returnValue = [
                  {
                    'type': 'Executive',
                    'name': 'Ann Brown',
                    'title': 'CEO',
                    'phone': '(512) 456-5555',
                    'ext': '',
                    'fax': '(512) 456-5555',
                    'email': 'Executive'
                  },
                  {
                    'type': 'Inmar AR',
                    'name': 'Mary Smith',
                    'title': 'Lorem Ipsum',
                    'phone': '(512) 456-5555',
                    'ext': '',
                    'fax': '(512) 456-5555',
                    'email': 'Inmar AR'
                  }];

            fixture.detectChanges();

            expect(homeInstance.contactService).toEqual(jasmine.any(MockContactService));
            expect(homeDOMEl.querySelectorAll('tr').length).toEqual(3);
            expect(contactServiceSpy.calls.count()).toBe(1);

            homeInstance.name = 'Minko';
            homeInstance.title = 'Minko';
            homeInstance.addEntry();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('tr').length).toEqual(4);
          });

      }));
  });
}

class MockContactService {

  returnValue: any[];

  get(): Observable<string[]> {
    return Observable.create((observer: any) => {
      observer.next(this.returnValue);
      observer.complete();
    });
  }

  add() {
    //A stub function
  }
}

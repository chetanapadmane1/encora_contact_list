import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { ContactListComponent } from './contact-list.component';
import { ContactService } from './contact.service';
import { ContactDetails } from '../types/contact';

const contactListDummy: ContactDetails[] = [{
  firstName: "Amit",
  lastName: "Roy",
  phone: "9876543210",
  id: 1
},
{
  firstName: "Aakash",
  lastName: "Choudhury",
  phone: "9876584431",
  id: 2
},
{
  firstName: "Arun",
  lastName: "Dey",
  phone: "5748493812",
  id: 3
}];

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactService: ContactService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactListComponent],
      imports: [HttpClientTestingModule, FormsModule]
    })
      .compileComponents();
    contactService = TestBed.inject(ContactService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should delete record onDelete', () => {
    component.contactList = JSON.parse(JSON.stringify(contactListDummy));

    component.onDelete({
      firstName: "Arun",
      lastName: "Dey",
      phone: "5748493812",
      id: 3
    });

    expect(component.contactList).toEqual([{
      firstName: "Amit",
      lastName: "Roy",
      phone: "9876543210",
      id: 1
    },
    {
      firstName: "Aakash",
      lastName: "Choudhury",
      phone: "9876584431",
      id: 2
    }]);

  });

  it('should enable edit flag onEdit', () => {
    component.contactList = JSON.parse(JSON.stringify(contactListDummy));

    component.onEdit({
      firstName: "Arun",
      lastName: "Dey",
      phone: "5748493812",
      id: 3
    });

    expect(component.editRowNumber).toBe(2);
    expect(component.firstName).toBe('Arun');
    expect(component.lastName).toBe('Dey');
    expect(component.phone).toBe('5748493812');
  });

  it('should edit record on editRecord', () => {
    component.contactList = JSON.parse(JSON.stringify(contactListDummy));
    component.editRowNumber = 2;
    component.firstName = 'test';
    component.lastName = 'test';
    component.phone = '9874563210';

    component.editRecord();

    expect(component.editRowNumber).toBe(null);
    expect(component.firstName).toBe(null);
    expect(component.lastName).toBe(null);
    expect(component.phone).toBe(null);
    expect(component.contactList[2]).toEqual({
      firstName: "test",
      lastName: "test",
      phone: "9874563210",
      id: 3
    });
  });

  it('should enable addNewRecord on call of addNew', () => {
    component.contactList = JSON.parse(JSON.stringify(contactListDummy));

    component.addNew();

    expect(component.addNewRecord).toBe(true);
  });


  describe('saveNewRecord', () => {
    beforeEach(() => {
      component.contactList = JSON.parse(JSON.stringify(contactListDummy));
    });

    it('should Add record if all fields are entered', () => {
      component.newFirstName = 'test';
      component.newLastName = 'test';
      component.newPhone = '9874563210';

      component.saveNewRecord();
      expect(component.contactList).toEqual([
        {
          firstName: "Amit",
          lastName: "Roy",
          phone: "9876543210",
          id: 1
        },
        {
          firstName: "Aakash",
          lastName: "Choudhury",
          phone: "9876584431",
          id: 2
        },
        {
          firstName: "Arun",
          lastName: "Dey",
          phone: "5748493812",
          id: 3
        },
        {
          firstName: "test",
          lastName: "test",
          phone: "9874563210",
          id: 0
        }
      ]);
    });

    it('should not add record if all fields are not entered', () => {
      component.newFirstName = 'test';

      component.saveNewRecord();
      expect(component.contactList).toEqual([
        {
          firstName: "Amit",
          lastName: "Roy",
          phone: "9876543210",
          id: 1
        },
        {
          firstName: "Aakash",
          lastName: "Choudhury",
          phone: "9876584431",
          id: 2
        },
        {
          firstName: "Arun",
          lastName: "Dey",
          phone: "5748493812",
          id: 3
        }
      ]);
    });
  })
});

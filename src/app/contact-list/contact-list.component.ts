import { Component, OnInit } from '@angular/core';
import { ContactDetails } from '../types/contact';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  public contactList: ContactDetails[];
  public editRowNumber: number;
  public addNewRecord = false;
  public requireAllDetails = false;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public newFirstName: string;
  public newLastName: string;
  public newPhone: string;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(res => {
      this.contactList = res;
    });
  }

  onDelete(contact: ContactDetails): void {
    const selectedContactIndex: number = this.contactList.findIndex(contactItemt => contact.phone === contactItemt.phone);
    this.contactList.splice(selectedContactIndex, 1);
  }

  onEdit(contact: ContactDetails): void {
    this.editRowNumber = this.contactList.findIndex(contactItemt => contact.phone === contactItemt.phone);
    this.firstName = contact.firstName;
    this.lastName = contact.lastName;
    this.phone = contact.phone;
  }

  editRecord(): void {
    const updateContact = this.contactList[this.editRowNumber];
    updateContact.firstName = this.firstName;
    updateContact.lastName = this.lastName;
    updateContact.phone = this.phone;
    this.editRowNumber = null;
    this.firstName = null;
    this.lastName = null;
    this.phone = null;
  }

  addNew(): void {
    this.addNewRecord = true;
  }

  saveNewRecord(): void {
    if (this.newFirstName && this.newLastName && this.newPhone) {
      this.contactList.push({
        firstName: this.newFirstName,
        lastName: this.newLastName,
        phone: this.newPhone,
        id: 0
      });
      this.addNewRecord = false;
      this.requireAllDetails = false;
      this.newFirstName = null;
      this.newLastName = null;
      this.newPhone = null;
    } else {
      this.requireAllDetails = true;
    }
  }
}

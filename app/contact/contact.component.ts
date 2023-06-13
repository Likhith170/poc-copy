import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string;
  email: string;
  message: string;
  isMessageSent: boolean = false;

  sendMessage(contactForm: any) {
    // Perform any necessary logic or send the message to the server

    // After successful submission, reset the form and set the isMessageSent flag to true
    contactForm.reset();
    this.isMessageSent = true;

    // You can also add additional logic or API calls here if needed
  }
}

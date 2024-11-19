import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent {
  faqs = [
    { question: 'What is your return policy?', answer: 'You can return any item within 30 days of purchase.', expanded: false },
    { question: 'How long does delivery take?', answer: 'Delivery usually takes 3-5 business days.', expanded: false },
    { question: 'What payment methods do you accept?', answer: 'We accept Visa, MasterCard, and PayPal.', expanded: false },
    { question: 'Is my payment information secure?', answer: 'Yes, we use SSL encryption to ensure your payment details are securely processed and stored.', expanded: false }
  ];
  
  toggleFAQ(index: number): void {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }
}

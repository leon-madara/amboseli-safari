import AccordionGroup from '@/components/organisms/AccordionGroup';
import { FAQ } from '@/types/faq';

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const items = faqs.map((faq) => ({
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <section>
      <h2>Frequently Asked Questions</h2>
      <AccordionGroup items={items} />
    </section>
  );
}

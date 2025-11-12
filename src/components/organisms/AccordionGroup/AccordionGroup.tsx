import AccordionItem from '@/components/molecules/AccordionItem';

interface AccordionGroupProps {
  items: Array<{
    title: string;
    content: string;
  }>;
}

export default function AccordionGroup({ items }: AccordionGroupProps) {
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

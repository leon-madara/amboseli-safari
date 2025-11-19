import AccordionItem from '@/components/molecules/AccordionItem';

interface AccordionGroupProps {
  items: Array<{
    title: string;
    content: string;
    id?: string;
  }>;
}

export default function AccordionGroup({ items }: AccordionGroupProps) {
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem key={item.id || index} title={item.title} questionId={item.id}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

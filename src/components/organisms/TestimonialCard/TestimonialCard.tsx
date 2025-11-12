import Card from '@/components/molecules/Card';
import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card>
      <div>
        {'⭐'.repeat(testimonial.rating)}
      </div>
      <p>{testimonial.text}</p>
      <div>
        <strong>{testimonial.name}</strong>
        <span> - {testimonial.location}</span>
      </div>
    </Card>
  );
}

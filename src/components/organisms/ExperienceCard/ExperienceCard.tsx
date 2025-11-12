import Card from '@/components/molecules/Card';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import { ExperienceType } from '@/types/experience';

interface ExperienceCardProps {
  experience: ExperienceType;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card hover>
      <h3>{experience.title}</h3>
      <Badge>{experience.difficulty}</Badge>
      <p>{experience.shortDescription}</p>
      <div>
        <strong>Duration:</strong> {experience.duration}
      </div>
      <Button>Learn More</Button>
    </Card>
  );
}

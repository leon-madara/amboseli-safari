import Card from '@/components/molecules/Card';
import Button from '@/components/atoms/Button';
import PriceTag from '@/components/molecules/PriceTag';
import { RoomType } from '@/types/room';

interface RoomCardProps {
  room: RoomType;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <Card hover>
      <h3>{room.name}</h3>
      <p>{room.shortDescription}</p>
      <PriceTag amount={room.price} period="night" />
      <div>
        <strong>Capacity:</strong> {room.capacity.adults} adults
        {room.capacity.children > 0 && `, ${room.capacity.children} children`}
      </div>
      <Button>View Details</Button>
    </Card>
  );
}

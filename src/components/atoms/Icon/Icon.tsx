import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

export default function Icon({ name, size = 24, ...props }: IconProps) {
  // Placeholder implementation - integrate with icon library
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Add icon paths here */}
    </svg>
  );
}

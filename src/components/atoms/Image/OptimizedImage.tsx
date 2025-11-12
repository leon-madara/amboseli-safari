import NextImage, { ImageProps } from 'next/image';

export default function OptimizedImage(props: ImageProps) {
  return <NextImage {...props} />;
}

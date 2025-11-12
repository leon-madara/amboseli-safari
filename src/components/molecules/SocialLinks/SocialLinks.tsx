import Link from '@/components/atoms/Link';
import styles from './SocialLinks.module.css';

interface SocialLinksProps {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export default function SocialLinks({
  facebook,
  instagram,
  twitter,
  linkedin,
}: SocialLinksProps) {
  return (
    <div className={styles.socialLinks}>
      {facebook && (
        <Link href={facebook} target="_blank" rel="noopener noreferrer">
          Facebook
        </Link>
      )}
      {instagram && (
        <Link href={instagram} target="_blank" rel="noopener noreferrer">
          Instagram
        </Link>
      )}
      {twitter && (
        <Link href={twitter} target="_blank" rel="noopener noreferrer">
          Twitter
        </Link>
      )}
      {linkedin && (
        <Link href={linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Link>
      )}
    </div>
  );
}

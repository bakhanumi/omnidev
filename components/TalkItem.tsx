import Image from 'next/image';
import type { Talk } from '@/lib/db/schema';

interface TalkItemProps {
  talk: Talk;
}

export default function TalkItem({ talk }: TalkItemProps) {
  return (
    <article className="talk-item">
      {talk.imageUrl ? (
        <Image 
          src={talk.imageUrl} 
          alt={`${talk.speakerName} - ${talk.title}`} 
          width={70} 
          height={70} 
        />
      ) : (
        <div style={{ width: 70, height: 70, backgroundColor: '#ccc' }} />
      )}
      <div className="talk-content">
        <h3>
          <span className="talk-title">{talk.title}</span> by{' '}
          <span className="speaker-name">{talk.speakerName}</span>
        </h3>
        <p>{talk.description}</p>
      </div>
    </article>
  );
}

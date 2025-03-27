import { Link } from 'react-router-dom';
import { redirect } from 'react-router';

export function loader() {
  return redirect('/skips');
}

export default function Component() {
  return null;
}

interface CardProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
  highlighted?: boolean;
}

function Card({ title, description, link, linkText, highlighted = false }: CardProps) {
  return (
    <div
      className={`bg-card rounded-lg p-6 border ${
        highlighted ? 'border-primary shadow-lg' : 'border-border'
      } hover:shadow-md transition-all duration-300 hover:scale-[1.02]`}
    >
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Link
        to={link}
        className={`inline-block px-4 py-2 rounded-md font-medium transition-colors ${
          highlighted
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
        }`}
      >
        {linkText}
      </Link>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import SparklesHeader from '../components/SparklesHeader';
import { motion } from 'framer-motion';

// No longer redirecting
// export function loader() {
//   return redirect("/skips");
// }

export default function Component() {
  return (
    <div className="min-h-screen bg-background text-foreground relative" data-author="Paul Doros">
      {/* Subtle sparkles effect at the top */}

      <div className="container mx-auto py-16 px-4">
        <motion.header
          className="text-center mb-16 pt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">RemWaste Skip Hire</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern, user-friendly application for skip hire management with beautiful UI
            components
          </p>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card
            title="Skip Selection"
            description="Browse and select from our range of skips for your waste management needs."
            link="/skips"
            linkText="Choose a Skip"
          />

          <Card
            title="Moving Border Demo"
            description="Explore our animated moving border component with various examples and implementations."
            link="/moving-border-demo"
            linkText="View Demo"
          />

          <Card
            title="Sparkles Demo"
            description="Discover the beautiful particles effect component with multiple variations and use cases."
            link="/sparkles-demo"
            linkText="View Sparkles"
            highlighted={true}
          />

          <Card
            title="Gradient Button Demo"
            description="See our sophisticated gradient buttons with various styles, sizes, and interaction states."
            link="/gradient-button-demo"
            linkText="View Buttons"
          />

          <Card
            title="Component Examples"
            description="Check out various UI components and their implementations in our design system."
            link="/examples"
            linkText="View Examples"
          />
        </motion.div>

        <footer className="text-center text-muted-foreground">
          <p>
            Designed by{' '}
            <a href="https://pauldoros.site" className="text-primary hover:underline">
              Paul Doros
            </a>
          </p>
        </footer>
      </div>

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
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

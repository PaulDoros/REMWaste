import React from 'react';
import { motion } from 'framer-motion';
import type { Skip } from '../constants/skips';
import { Button, MovingBorder } from './ui/moving-border';
import { cn } from '../lib/utils';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: () => void;
  isComparing?: boolean;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect, isComparing = false }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Calculate total price including VAT
  const vatAmount = skip.price_before_vat * (skip.vat / 100);
  const totalPrice = skip.price_before_vat + vatAmount;

  // Check if the skip is only for private property
  const isPrivateOnly = !skip.allowed_on_road;

  // Handle card click
  const handleCardClick = () => {
    onSelect();
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  // Custom animation variants for hover effect
  const hoverVariants = {
    initial: {
      scale: 1,
      boxShadow: '0 0 0 rgba(0,0,0,0)',
    },
    hover: {
      scale: 0.98,
      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
      transition: {
        scale: {
          duration: 0.2,
          ease: 'easeOut',
        },
        boxShadow: {
          duration: 0.2,
        },
      },
    },
  };

  return (
    <motion.div
      className={cn(
        'cursor-pointer border-background relative p-[2px] rounded-lg overflow-visible bg-card',
        isSelected ? 'bg-card' : '',
        isComparing ? 'bg-card' : '',
        isHovered ? 'z-20 bg-card' : ''
      )}
      onClick={handleCardClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial="initial"
      whileHover="hover"
      variants={hoverVariants}
    >
      {/* Moving border animation - only show for selected state */}
      {isSelected && (
        <div className="absolute inset-0 z-0 pointer-events-none selected-moving-border">
          <MovingBorder duration={2800} rx="12px" ry="12px">
            <div className="moving-border-gradient h-40 w-40 opacity-[0.9] bg-[radial-gradient(var(--primary)_10%,var(--indigo-500)_25%,var(--blue-500)_50%,transparent_70%)]" />
          </MovingBorder>
        </div>
      )}

      {/* Comparing highlight - show for comparison state */}
      {isComparing && !isSelected && (
        <div className="absolute inset-0 z-0 pointer-events-none border-2 border-primary/70 rounded-lg comparison-pulse-border"></div>
      )}

      <div
        className={cn(
          'relative z-10 bg-card p-4 rounded-lg border transition-all duration-300',
          isSelected
            ? 'shadow-lg'
            : isComparing
              ? 'shadow-md border-primary/70 comparison-pulse'
              : isHovered
                ? 'shadow-md hover-border-pulse'
                : 'border-border'
        )}
      >
        {/* Skip size badge */}
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-sm px-2 py-1 rounded-full font-semibold z-10 shadow-sm">
          {skip.size} Yards
        </div>

        {/* Comparing badge */}
        {isComparing && !isSelected && (
          <div className="absolute top-3 left-3 bg-green-500/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-sm z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 3h5v5" />
              <path d="M8 3H3v5" />
              <path d="M21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5" />
              <path d="m21 8-5-5-5 5" />
              <path d="M3 16l5 5 5-5" />
            </svg>
            <span>Comparing</span>
          </div>
        )}

        {/* Skip image */}
        <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-md">
          <img
            src={skip.imageUrl || '/images/skip-default.jpg'}
            alt={`${skip.size} Yard Skip`}
            className="w-full h-full object-cover"
            onError={e => {
              // Fallback for missing images
              const target = e.target as HTMLImageElement;
              target.src = '/images/skip-default.jpg';
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>

          {/* Private property only badge */}
          {isPrivateOnly && (
            <div className="absolute bottom-3 left-3 bg-amber-600 text-white text-xs px-2 py-1 rounded-full flex items-center shadow-sm backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Private Property Only</span>
            </div>
          )}

          {/* Features badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {skip.allows_heavy_waste && (
              <span className="bg-blue-800/40 text-success font-medium text-xs px-2 py-1 rounded-full backdrop-blur-sm shadow-sm">
                Heavy Waste
              </span>
            )}
            {!skip.allowed_on_road && (
              <span className="bg-amber-800/40 text-warning font-medium text-xs px-2 py-1 rounded-full backdrop-blur-sm shadow-sm">
                Not for Road
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">{skip.name || `${skip.size} Yard Skip`}</h3>
            <div className="text-lg font-bold">£{Math.round(totalPrice)}</div>
          </div>

          <p className="text-sm text-muted-foreground">
            {skip.description || `${skip.size} cubic yard capacity skip.`}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Hire period: {skip.hire_period_days} days</span>
            <span>{skip.postcode || 'All Areas'}</span>
          </div>

          <button
            onClick={handleButtonClick}
            className={cn(
              'w-full mt-2 py-2 text-sm font-medium rounded-md transition-all duration-300',
              isSelected
                ? 'bg-primary text-primary-foreground ring-2 ring-primary/50 ring-offset-2 ring-offset-background'
                : isComparing
                  ? 'bg-primary/70 text-primary-foreground'
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
            )}
          >
            {isSelected ? 'Selected' : isComparing ? 'Comparing' : 'Select'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SkipCard;

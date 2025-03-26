'use client';
import React from 'react';
import { Button } from './moving-border';

export function MovingBorderDemo() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Button
        borderRadius="1.75rem"
        className="bg-card text-card-foreground border-border dark:border-slate-800"
      >
        Borders are cool
      </Button>

      <Button
        borderRadius="0.5rem"
        className="bg-primary hover:bg-primary/90 text-primary-foreground border-primary/20"
        borderClassName="bg-[radial-gradient(var(--sky-500)_30%,transparent_70%)]"
      >
        Skip Selection
      </Button>
    </div>
  );
}

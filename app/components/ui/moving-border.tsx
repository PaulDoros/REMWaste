import { cn } from '~/lib/utils';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Button({
  borderRadius = '1.75rem',
  children,
  as: Component = 'button',
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        'bg-transparent relative text-xl h-16 w-40 p-[1px] overflow-hidden',
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              'h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--primary)_40%,transparent_60%)]',
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          'relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased',
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx = '30',
  ry,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame(time => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength?.() || 0;
      if (length) {
        const pxPerMillisecond = length / duration;
        progress.set((time * pxPerMillisecond) % length);
      }
    }
  });

  // Create a transformer function for x coordinate
  const transformX = (val: number) => {
    if (!pathRef.current) return 0;
    const point = pathRef.current.getPointAtLength?.(val);
    return point?.x || 0;
  };

  // Create a transformer function for y coordinate
  const transformY = (val: number) => {
    if (!pathRef.current) return 0;
    const point = pathRef.current.getPointAtLength?.(val);
    return point?.y || 0;
  };

  const x = useTransform(progress, transformX);
  const y = useTransform(progress, transformY);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'inline-block',
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

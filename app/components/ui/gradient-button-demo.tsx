import React from 'react';
import { GradientButton } from './gradient-button';

function GradientButtonDemo() {
  return (
    <div className="space-y-12 p-8 bg-card rounded-lg border border-border">
      <div>
        <h2 className="text-xl font-semibold mb-6">Gradient Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <GradientButton>Default</GradientButton>
          <GradientButton variant="variant">Variant</GradientButton>
          <GradientButton variant="outline">Outline</GradientButton>
          <GradientButton variant="proceed">Proceed</GradientButton>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <GradientButton size="sm">Small</GradientButton>
          <GradientButton size="default">Default</GradientButton>
          <GradientButton size="lg">Large</GradientButton>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6">Combined Variants and Sizes</h2>
        <div className="flex flex-wrap gap-4">
          <GradientButton variant="proceed" size="sm">
            Proceed Small
          </GradientButton>
          <GradientButton variant="proceed">Proceed Default</GradientButton>
          <GradientButton variant="proceed" size="lg">
            Proceed Large
          </GradientButton>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6">Disabled State</h2>
        <div className="flex flex-wrap gap-4">
          <GradientButton disabled>Disabled Default</GradientButton>
          <GradientButton variant="proceed" disabled>
            Disabled Proceed
          </GradientButton>
          <GradientButton variant="outline" disabled>
            Disabled Outline
          </GradientButton>
        </div>
      </div>
    </div>
  );
}

export { GradientButtonDemo };

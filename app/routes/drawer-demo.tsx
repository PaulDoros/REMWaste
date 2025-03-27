import { DrawerDemo } from '~/components/ui/drawer-demo';

export default function DrawerDemoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md mx-auto">
        <h1 className="mb-8 text-center text-2xl font-bold">Drawer Component Demo</h1>
        <div className="flex justify-center">
          <DrawerDemo />
        </div>
      </div>
    </div>
  );
}

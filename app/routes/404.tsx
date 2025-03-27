import { NotFound, Illustration } from '../components/ui/not-found';

export default function NotFoundPage() {
  return (
    <div className="relative flex flex-col w-full justify-center min-h-screen bg-background p-6 md:p-10">
      <div className="relative max-w-5xl mx-auto w-full">
        <Illustration className="absolute inset-0 w-full h-[50vh] opacity-[0.04] dark:opacity-[0.03] text-foreground" />
        <NotFound
          title="Page not found"
          description="The page you are looking for doesn't exist or has been moved."
        />
      </div>
    </div>
  );
}

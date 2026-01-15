/**
 * Loading skeleton component for displaying loading states.
 * Used as a fallback UI while data is being fetched or session is loading.
 *
 * @component
 * @returns A skeleton UI with animated placeholder elements
 *
 * @example
 * ```tsx
 * import LoadingSkeleton from '@/shared/ui/loadingSkeleton';
 *
 * export default function MyPage() {
 *   return <LoadingSkeleton />;
 * }
 * ```
 */
export default function LoadingSkeleton(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header skeleton */}
        <div className="space-y-2 text-center">
          <div className="h-8 bg-gray-300 rounded-lg w-32 mx-auto animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-lg w-48 mx-auto animate-pulse" />
        </div>

        {/* Form skeleton */}
        <div className="space-y-4">
          {/* Email field */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-20 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Button */}
          <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg animate-pulse mt-6" />
        </div>

        {/* Footer skeleton */}
        <div className="space-y-2 text-center">
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-32 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}

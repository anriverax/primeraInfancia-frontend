import { FileText, User } from "lucide-react";
import { PropsWithChildren } from "react";

/**
 * Props for AppendixLayout.
 *
 * title and subTitle are displayed as the main headings; teacher is shown as a
 * labeled chip next to the file icon; description renders a short paragraph of
 * contextual information below the headings.
 */
type AppendixLayoutProps = {
  /** Main label shown within the secondary-colored chip. */
  title: string;
  /** Subtitle rendered as the H1 heading below the chips. */
  subTitle: string;
  /** Encoded teacher name. Decoded via decodeURIComponent before rendering. */
  teacher: string;
  /** Short description text placed under the subtitle. */
  description: string;
};

/**
 * Layout wrapper for mentoring appendices.
 *
 * Renders two header chips (document title and teacher), a subtitle as H1, and a
 * description block, followed by any children content.
 *
 * Notes:
 * - teacher and subTitle are decoded using `decodeURIComponent` to safely display values
 *   coming from query strings or encoded sources.
 * - Visual styles use Tailwind utility classes; no runtime behavior is altered by comments.
 */
export const AppendixLayout = ({
  title,
  subTitle,
  teacher,
  description,
  children
}: PropsWithChildren<AppendixLayoutProps>): React.JSX.Element => (
  <div className="max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-4rem)] lg:max-w-4xl lg:mx-auto p-6 space-y-8">
    <div className="space-y-8">
      {/* Document label chip */}
      <div className="inline-flex mr-2 items-center px-3 py-1 rounded-full text-sm border-0 bg-secondary-300 text-white">
        <FileText className="w-3 h-3 mr-1" />
        {title}
      </div>
      {/* Teacher chip (decoded in case it comes URL-encoded) */}
      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm  border-0 bg-primary-300 text-white">
        <User className="w-3 h-3 mr-1" />
        {decodeURIComponent(teacher)}
      </div>
      {/* Main heading uses decoded subtitle */}
      <h1 className="text-4xl font-bold mb-3">{decodeURIComponent(subTitle)}</h1>
      <p className="text-lg">{description}</p>
    </div>
    {/* Content area injected by parent component */}
    {children}
  </div>
);

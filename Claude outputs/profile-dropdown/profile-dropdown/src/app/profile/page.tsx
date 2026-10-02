import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import ProfileDetailCard from './profile-detail-card';

export const metadata = { title: 'Profile' };

/**
 * Just the card, full width. Logging out lives in the avatar menu on the
 * bottom bar — this page deliberately carries no account chrome.
 */
export default async function ProfilePage() {
  // The bottom bar points signed-out visitors at /login, but this URL can be
  // reached directly.
  if (!(await getCurrentUser())) redirect('/login');

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <ProfileDetailCard />
    </div>
  );
}

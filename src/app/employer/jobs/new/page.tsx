import { redirect } from 'next/navigation';
import { getToken } from '@/lib/api';
import { JobWizard } from './wizard';

export const metadata = { title: 'Post a job' };

/**
 * Auth gate for the wizard.
 *
 * Without this a signed-out visitor could fill in all three steps and only
 * discover the problem when the API rejected the submit — losing everything
 * they typed. The panel and profile are gated the same way.
 */
export default async function NewJobPage() {
  if (!(await getToken())) redirect('/login');

  return <JobWizard />;
}

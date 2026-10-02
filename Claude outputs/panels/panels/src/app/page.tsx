import { redirect } from 'next/navigation';

export default function Home() {
  // The job board is the public face of the portal; employers reach their
  // panel from the header link or by signing in.
  redirect('/jobs');
}

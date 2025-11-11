import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
export const BASE = '/ParkingPals-Fall-2025-Repo'; 

const SUPABASE_URL = 'https://objauqyapbcgetfvnmbm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iamF1cXlhcGJjZ2V0ZnZubWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMTAyOTYsImV4cCI6MjA3Nzc4NjI5Nn0.2I0lO98cq9kLBmyKkOr5maVNaUHKvGv3biYt-NF2JcY';

// Make the client available to other scripts
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

//CHange window locations
export function go(path) { window.location.href = `${BASE}${path}`; }

//Make sure that user is logged in, and if not, send them back to login
export async function requireAuth(redirectTo = '/login/login.html') {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) go(redirectTo);
  return session;
}

//If user is already logged in, send them to the dashboard page
export async function redirectIfAuthed(redirectTo = '/user/dahsboard/dashboard.html') {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) go(redirectTo);
  return session;
}
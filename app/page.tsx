import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <SignedIn>
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-bold">Welcome to Auna</h1>
            <p className="text-xl">Your AI Assistant</p>
            <Link
              href="/chat"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Chatting
            </Link>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-bold">Welcome to Auna</h1>
            <p className="text-xl">Sign in to get started</p>
            <SignInButton mode="modal">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </div>
    </main>
  );
}

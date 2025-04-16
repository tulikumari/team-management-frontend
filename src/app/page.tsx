import Link from "next/link";
import ManageTeamMembers from "./pages/manage-team-members/page";

export default function Home() {
  return (
    <main className="w-full">
      <div className="relative h-[400px] mx-auto overflow-hidden shadow-md">
        <img
          src="/images/hero.png"
          alt="Team Meeting Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to the Home Page</h1>
          <p className="text-lg max-w-xl">
             Organize members, track progress, and enhance collaboration effortlessly.
          </p>
        </div>
      </div>

      <ManageTeamMembers isHomePage={true} />
    </main>
  );
}

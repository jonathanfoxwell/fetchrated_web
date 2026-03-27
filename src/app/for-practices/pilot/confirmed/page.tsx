import {
  Navigation,
  Footer,
  PilotConfirmation,
} from "@/components";

export const metadata = {
  title: "Welcome to the Pilot | FetchRated",
  description: "You're now part of the FetchRated national pilot programme.",
};

export default function PilotConfirmedPage() {
  return (
    <div className="min-h-screen bg-card">
      <Navigation currentPath="/for-practices" />

      <main className="pt-24 pb-24">
        <section className="max-w-2xl mx-auto px-6 lg:px-8 py-16">
          <PilotConfirmation />
        </section>
      </main>

      <Footer />
    </div>
  );
}

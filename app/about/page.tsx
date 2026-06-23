/**
 * Renders the about page with editorial positioning and disclaimers.
 */
export default function AboutPage(): JSX.Element {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-panel sm:p-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            About
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            DetectAIvoice is an independent resource dedicated to helping people detect AI
            voice deepfakes.
          </h1>
          <p className="text-base leading-8 text-slate-600">
            The site is designed for consumers, enterprise security teams, and media
            verification professionals who need practical guidance they can use quickly.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-[2rem] bg-slate-50 p-6">
            <h2 className="text-2xl font-semibold text-slate-900">Research basis</h2>
            <p className="mt-3 text-base leading-8 text-slate-600">
              Our coverage is grounded in public research reports, fraud trend summaries,
              and tool benchmark claims that can be independently reviewed.
            </p>
          </section>

          <section className="rounded-[2rem] bg-slate-50 p-6">
            <h2 className="text-2xl font-semibold text-slate-900">Disclaimer</h2>
            <p className="mt-3 text-base leading-8 text-slate-600">
              Deepfake detection is probabilistic. No article, checklist, or tool listed
              on this site should be treated as sole evidence in a high-stakes decision.
            </p>
          </section>
        </div>

        <section className="rounded-[2rem] border border-slate-200 p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-3 text-base leading-8 text-slate-600">
            Editorial contact placeholder: hello@detectaivoice.vercel.app
          </p>
        </section>
      </div>
    </div>
  );
}

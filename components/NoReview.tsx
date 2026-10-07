import Link from "next/link";

export default function NoReview({ error }: { error: string }) {
    return (
        <section className="max-w-md rounded-2xl border border-[#dce6dd] bg-white p-8 text-center">
            <h1 className="text-xl font-semibold text-[#17251e]">
                Review unavailable
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#5f6d64]" role="alert">
                {error}
            </p>
            <Link
                className="mt-6 inline-flex rounded-lg bg-[#203c2d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#315741]"
                href="/"
            >
                Back to upload
            </Link>
        </section>
    )
}
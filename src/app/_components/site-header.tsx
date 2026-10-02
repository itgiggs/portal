/**
 * The top bar is intentionally empty.
 *
 * Navigation and the account menu both moved to the floating bottom bar; this
 * strip stays so the page-level sticky headers keep their 52px offset and the
 * layout doesn't shift. Put a logo or page title here later if you want one.
 */
export function SiteHeader() {
  return (
    <div />
    // <div
    //   aria-hidden="true"
    //   className="sticky top-0 z-20 h-[52px] shrink-0 border-b border-black/[.06] bg-white/95 backdrop-blur dark:border-white/[.1] dark:bg-black/90"
    // />
  );
}

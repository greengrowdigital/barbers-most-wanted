export default function PageLoader({ done }) {
  return (
    <div className={"page-loader" + (done ? " done" : "")}>
      <div className="text-center">
        <div className="loader-mark">BMW</div>
        <div className="mt-6 font-stencil text-[.7rem] tracking-stencil text-fog">
          BARBERS · MOST · WANTED
        </div>
      </div>
    </div>
  )
}

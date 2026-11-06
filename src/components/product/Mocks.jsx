import { chatModels } from "../../constants";
import Artwork from "../brand/Artwork";
import { LogoMark } from "../brand/Logo";
import Icon from "../ui/Icon";

/* Small building blocks ------------------------------------------------ */

export const Cite = ({ n, active }) => (
  <sup
    className={`inline-flex items-center justify-center min-w-[1.05rem] h-[1.05rem] mx-0.5 px-1 rounded-sm font-mono text-[0.625rem] font-medium align-[0.35em] ${
      active ? "bg-accent text-accent-ink" : "bg-accent/15 text-accent"
    }`}
  >
    {n}
  </sup>
);

const SideItem = ({ icon = "file", children, active, meta }) => (
  <li
    className={`flex items-center gap-2 h-8 px-2 rounded-md text-[0.8125rem] ${
      active ? "bg-raised text-fg" : "text-fg-3"
    }`}
  >
    <Icon name={icon} size={14} className={active ? "text-fg-2" : "text-fg-4"} />
    <span className="truncate">{children}</span>
    {meta && <span className="ml-auto font-mono text-2xs text-fg-4">{meta}</span>}
  </li>
);

export const ModelPill = ({ label = "Aster 2", open = false }) => (
  <span
    className={`inline-flex items-center gap-1.5 shrink-0 h-7 px-2.5 rounded-md border text-xs font-medium whitespace-nowrap ${
      open ? "border-line-strong bg-raised text-fg" : "border-line text-fg-2"
    }`}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
    {label}
    <Icon name="chevronDown" size={12} className="text-fg-3" />
  </span>
);

export const ModelMenu = ({ value = "aster-2", className = "" }) => (
  <div className={`w-64 p-1 bg-raised border border-line-strong rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${className}`}>
    <p className="px-2.5 pt-2 pb-1.5 t-label text-fg-4">Model</p>
    {chatModels.map((m) => (
      <div key={m.id} className={`flex items-start gap-2.5 px-2.5 py-2 rounded-md ${m.id === value ? "bg-surface" : ""}`}>
        <div className="flex-1 min-w-0">
          <p className="text-[0.8125rem] font-medium text-fg">{m.label}</p>
          <p className="text-xs text-fg-3">{m.description}</p>
        </div>
        {m.id === value ? (
          <Icon name="check" size={14} className="mt-0.5 text-accent" />
        ) : (
          <span className="mt-0.5 font-mono text-2xs text-fg-4">{m.meta}</span>
        )}
      </div>
    ))}
  </div>
);

/* Research workspace (hero shot) --------------------------------------- */

export const ResearchMock = ({ sidebar = true, followUps = true, heightClass = "h-[36rem] md:h-[38rem]" }) => (
  <div className={`flex text-left ${heightClass}`}>
    {/* Sidebar */}
    <aside className={`hidden ${sidebar ? "md:flex" : ""} flex-col w-[13.5rem] shrink-0 p-3 border-r border-line bg-surface`}>
      <div className="flex items-center gap-2 px-1 mb-4">
        <LogoMark size={20} />
        <span className="text-sm font-semibold tracking-[-0.02em]">Aster</span>
        <span className="ml-auto kbd h-5">⌘K</span>
      </div>
      <p className="px-2 mb-1.5 t-label text-fg-4">Projects</p>
      <ul className="space-y-0.5 mb-5">
        <SideItem icon="layers" active meta="12">Urban heat brief</SideItem>
        <SideItem icon="layers" meta="31">Reader survey Q3</SideItem>
        <SideItem icon="layers" meta="8">Grant proposal 2027</SideItem>
        <SideItem icon="image" meta="40">Cover series, spring</SideItem>
      </ul>
      <p className="px-2 mb-1.5 t-label text-fg-4">This project</p>
      <ul className="space-y-0.5">
        <SideItem icon="chat">Interventions that work</SideItem>
        <SideItem icon="pen">Brief, draft 2</SideItem>
        <SideItem icon="chat">Cost per degree</SideItem>
      </ul>
      <div className="mt-auto p-2.5 rounded-md border border-line">
        <div className="flex justify-between mb-2 text-xs">
          <span className="text-fg-3">Credits this month</span>
          <span className="font-mono text-fg-2">62%</span>
        </div>
        <span className="block h-1 rounded-full bg-line">
          <span className="block h-full w-[62%] rounded-full bg-fg-2" />
        </span>
      </div>
    </aside>

    {/* Thread */}
    <section className="flex flex-col flex-1 min-w-0">
      <div className="flex items-center gap-3 h-12 px-4 border-b border-line">
        <ModelPill />
        <span className="hidden sm:block min-w-0 text-[0.8125rem] text-fg-3 truncate">Urban heat brief / Interventions that work</span>
        <span className={`ml-auto hidden items-center gap-1.5 font-mono text-2xs text-fg-4 whitespace-nowrap ${sidebar ? "sm:inline-flex" : "xl:inline-flex"}`}>
          <Icon name="lock" size={12} /> EU region
        </span>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden px-4 py-6 md:px-8">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex justify-end">
            <p className="max-w-[85%] px-3.5 py-2 rounded-lg bg-raised border border-line text-sm text-fg">
              Which interventions lower street temperatures the most in dense neighbourhoods?
            </p>
          </div>
          <div className="flex gap-3">
            <LogoMark size={22} className="mt-0.5" />
            <div className="space-y-3 text-sm leading-6 text-fg-2">
              <p>
                Across your 12 sources, <strong className="font-medium text-fg">street trees</strong> have the largest
                measured effect, cutting surface temperatures by 4 to 8 °C at midday
                <Cite n="1" active />
                <Cite n="3" />. <strong className="font-medium text-fg">Cool roofs</strong> lower roof temperatures
                sharply but change street level air temperature by under 1 °C<Cite n="2" />.
              </p>
              <p>
                Shade structures over bus stops are cheaper per square metre, but only one source measures them
                <Cite n="4" />, so treat that figure as provisional.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 font-mono text-2xs text-fg-4">
                <span>4 sources</span>
                <span>6 citations</span>
                <span>Aster 2, 3.1 s</span>
              </div>
            </div>
          </div>
          {followUps && (
            <div className="hidden md:block pl-[2.125rem]">
              <p className="mb-2 t-label text-fg-4">Follow up</p>
              <div className="flex flex-wrap gap-2">
                {["Show counter-evidence", "Cost per degree of cooling", "Draft a summary paragraph"].map((f) => (
                  <span key={f} className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-line text-xs text-fg-2">
                    <Icon name="arrowUpRight" size={12} className="text-fg-4" />
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 pb-4 md:px-8">
        <div className="flex items-center gap-2 max-w-xl mx-auto h-11 pl-3 pr-1.5 rounded-lg border border-line-strong bg-surface">
          <Icon name="paperclip" size={15} className="text-fg-4" />
          <span className="flex-1 text-sm text-fg-4 truncate">Ask a follow-up, or type / for commands</span>
          <span className="flex items-center justify-center w-8 h-8 rounded-md bg-accent text-accent-ink">
            <Icon name="arrowUp" size={15} strokeWidth={2.25} />
          </span>
        </div>
      </div>
    </section>

    {/* Sources */}
    <aside className="hidden lg:flex flex-col w-[19rem] shrink-0 border-l border-line bg-surface">
      <div className="flex items-center gap-4 h-12 px-4 border-b border-line text-[0.8125rem]">
        <span className="text-fg">Sources <span className="font-mono text-2xs text-fg-3">12</span></span>
        <span className="text-fg-3">Notes</span>
        <span className="text-fg-3">Pinned</span>
      </div>
      <div className="p-3 space-y-2">
        <div className="p-3 rounded-md border border-line-strong bg-bg">
          <div className="flex items-center gap-2 mb-2">
            <Cite n="1" active />
            <span className="text-xs font-medium text-fg truncate">Tree canopy and street heat.pdf</span>
          </div>
          <p className="text-xs leading-5 text-fg-3">
            ... blocks with over 30% canopy cover recorded{" "}
            <mark className="bg-accent/20 text-fg rounded-sm px-0.5">midday surface temperatures 4.1 to 7.9 °C lower</mark>{" "}
            than adjacent blocks without trees ...
          </p>
          <p className="mt-2 font-mono text-2xs text-fg-4">Page 14, Table 3</p>
        </div>
        {[
          ["2", "Cool roof retrofit study", "Report, p. 6"],
          ["3", "City climate plan, annex B", "PDF, p. 41"],
          ["4", "Bus shelter shading pilot", "Web page"],
        ].map(([n, t, m]) => (
          <div key={n} className="flex items-start gap-2 p-3 rounded-md border border-line">
            <Cite n={n} />
            <div className="min-w-0">
              <p className="text-xs text-fg-2 truncate">{t}</p>
              <p className="font-mono text-2xs text-fg-4">{m}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  </div>
);

/* Writing view ----------------------------------------------------------- */

export const WriteMock = () => (
  <div className="p-5 md:p-7 text-left">
    <div className="flex items-center gap-2 mb-5">
      <span className="t-label text-fg-4">Brief, draft 2</span>
      <span className="ml-auto inline-flex items-center gap-1.5 h-6 px-2 rounded border border-line font-mono text-2xs text-fg-3">
        Style guide: House style
      </span>
    </div>
    <h4 className="mb-3 text-lg font-medium tracking-[-0.01em]">Cooling dense neighbourhoods</h4>
    <p className="text-sm leading-7 text-fg-2">
      Street trees are the most effective single measure we reviewed.{" "}
      <del className="text-danger/90 decoration-danger/70">They are also very cheap and easy to plant everywhere.</del>{" "}
      <ins className="no-underline bg-accent/15 text-fg rounded-sm px-0.5">
        They take five to ten years to reach full effect, so early planting matters.
      </ins>{" "}
      Cool roofs help residents on top floors but do little for people on the street.
    </p>
    <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-line">
      <span className="text-xs text-fg-3">1 suggestion</span>
      <span className="ml-auto inline-flex items-center h-7 px-2.5 rounded-md border border-line text-xs text-fg-2">Reject</span>
      <span className="inline-flex items-center h-7 px-2.5 rounded-md bg-fg text-bg text-xs font-medium">Accept</span>
    </div>
  </div>
);

/* Image result grid ------------------------------------------------------ */

export const ImageGridMock = ({ scene = "city", palette = "editorial", prompt = "City blocks at midday, heat haze, space for a title", selected = 1 }) => (
  <div className="p-4 md:p-5 text-left">
    <div className="flex items-center gap-2 mb-3">
      <p className="flex-1 min-w-0 text-[0.8125rem] text-fg-2 truncate">{prompt}</p>
      <span className="shrink-0 inline-flex items-center h-6 px-2 rounded border border-line font-mono text-2xs text-fg-3">16:9</span>
      <span className="shrink-0 hidden sm:inline-flex items-center h-6 px-2 rounded border border-line font-mono text-2xs text-fg-3">Editorial</span>
    </div>
    <div className="grid grid-cols-2 gap-2">
      {[3, 8, 14, 21].map((seed, i) => (
        <div
          key={seed}
          className={`relative aspect-video overflow-hidden rounded-md ${i === selected ? "ring-2 ring-accent ring-offset-2 ring-offset-bg" : ""}`}
        >
          <Artwork scene={scene} palette={palette} seed={seed} />
          <span className="absolute left-1.5 bottom-1.5 px-1.5 rounded-sm bg-bg/80 font-mono text-2xs text-fg-2">{`V${i + 1}`}</span>
        </div>
      ))}
    </div>
    <div className="flex items-center gap-2 mt-3">
      <span className="font-mono text-2xs text-fg-4">seed 48213 · 9.2 s</span>
      <span className="ml-auto inline-flex items-center h-7 px-2.5 rounded-md border border-line text-xs text-fg-2">Vary</span>
      <span className="inline-flex items-center h-7 px-2.5 rounded-md bg-fg text-bg text-xs font-medium">Upscale V2</span>
    </div>
  </div>
);

/* Sources list (tour) --------------------------------------------------- */

export const SourcesMock = () => (
  <div className="p-5 text-left">
    <div className="flex items-center justify-between mb-4">
      <p className="text-sm font-medium">Sources</p>
      <span className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-line text-xs text-fg-2">
        <Icon name="plus" size={13} /> Add
      </span>
    </div>
    <div className="mb-3 p-4 rounded-md border border-dashed border-line-strong text-center">
      <p className="text-xs text-fg-3">Drop PDFs, paste links or connect a folder</p>
    </div>
    <ul className="divide-y divide-line border-y border-line">
      {[
        ["Tree canopy and street heat.pdf", "2.4 MB", "Indexed"],
        ["Cool roof retrofit study.pdf", "1.1 MB", "Indexed"],
        ["City climate plan, annex B.pdf", "8.7 MB", "Indexing 64%"],
        ["climate-adapt.eu/case-study", "Link", "Indexed"],
      ].map(([n, s, st]) => (
        <li key={n} className="flex items-center gap-3 py-2.5">
          <Icon name={s === "Link" ? "globe" : "file"} size={15} className="text-fg-4" />
          <span className="flex-1 min-w-0 text-[0.8125rem] text-fg-2 truncate">{n}</span>
          <span className="hidden sm:block font-mono text-2xs text-fg-4">{s}</span>
          <span className={`font-mono text-2xs ${st.startsWith("Indexing") ? "text-warn" : "text-fg-3"}`}>{st}</span>
        </li>
      ))}
    </ul>
  </div>
);

/* Compact chat (tour) --------------------------------------------------- */

export const ChatMock = () => (
  <div className="p-5 text-left space-y-5">
    <div className="flex items-center gap-2">
      <ModelPill />
    </div>
    <div className="flex justify-end">
      <p className="max-w-[85%] px-3.5 py-2 rounded-lg bg-raised border border-line text-sm">What does canopy cover do to night temperatures?</p>
    </div>
    <div className="flex gap-3">
      <LogoMark size={22} className="mt-0.5" />
      <p className="text-sm leading-6 text-fg-2">
        The effect is smaller at night: around 1 to 2 °C<Cite n="1" active />. Two sources note that dense canopy can
        trap heat slightly after sunset<Cite n="3" />.
      </p>
    </div>
  </div>
);

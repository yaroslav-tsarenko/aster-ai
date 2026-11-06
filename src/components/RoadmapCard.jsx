import { useState } from "react";
import { roadmapStatuses } from "../constants";
import useInView from "../hooks/useInView";
import Icon from "./ui/Icon";
import useToast from "../hooks/useToast";

/**
 * Roadmap item in a hairline grid cell: status, date, title, text,
 * optional progress bar and upvote button.
 */
const RoadmapCard = ({ item, showProgress = false, showVotes = false, className = "" }) => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const { toast } = useToast();
  const [voted, setVoted] = useState(false);
  const status = roadmapStatuses[item.status];

  const vote = () => {
    setVoted((v) => !v);
    if (!voted) toast(`Your vote for “${item.title}” was counted.`, { tone: "info" });
  };

  return (
    <article ref={ref} className={`flex flex-col p-6 border-r border-b border-line lg:p-8 ${className}`}>
      <div className="flex items-center justify-between gap-4 mb-10">
        <span className="inline-flex items-center gap-2 text-xs text-fg-2">
          {item.status === "done" ? (
            <Icon name="check" size={14} className="text-accent" />
          ) : item.status === "progress" ? (
            <Icon name="clock" size={14} className="text-warn" />
          ) : (
            <Icon name="circle" size={14} className="text-fg-3" />
          )}
          {status.label}
        </span>
        <time className="font-mono text-2xs text-fg-4">{item.date}</time>
      </div>

      <h3 className="t-h4 mb-2">{item.title}</h3>
      <p className="t-small text-fg-3">{item.text}</p>

      {(showProgress || showVotes) && (
        <div className="flex items-end gap-6 mt-auto pt-8">
          {showProgress && (
            <div className="flex-1">
              <div className="flex justify-between mb-2 font-mono text-2xs text-fg-4">
                <span>Progress</span>
                <span className="tabular text-fg-2">{item.progress}%</span>
              </div>
              <div
                className="h-1 bg-line rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={item.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.title} progress`}
              >
                <div
                  className={`h-full rounded-full transition-[width] duration-[1200ms] ease-out ${
                    item.status === "done" ? "bg-accent" : item.status === "progress" ? "bg-warn" : "bg-fg-3"
                  }`}
                  style={{ width: inView ? `${item.progress}%` : "0%" }}
                />
              </div>
            </div>
          )}
          {showVotes && (
            <button
              type="button"
              onClick={vote}
              aria-pressed={voted}
              aria-label={`${voted ? "Remove vote for" : "Upvote"} ${item.title}`}
              className={`inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border text-xs transition-colors ${
                voted ? "border-fg-3 bg-raised text-fg" : "border-line text-fg-3 hover:border-line-strong hover:text-fg"
              }`}
            >
              <Icon name="arrowUp" size={13} className={voted ? "text-accent" : ""} />
              <span className="font-mono tabular">{(item.votes + (voted ? 1 : 0)).toLocaleString("en-US")}</span>
            </button>
          )}
        </div>
      )}
    </article>
  );
};

export default RoadmapCard;

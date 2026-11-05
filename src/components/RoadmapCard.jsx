import { useState } from "react";
import Tagline from "./Tagline";
import { check2, grid, loading1 } from "../assets";
import { roadmapStatuses } from "../constants";
import useInView from "../hooks/useInView";
import Icon from "./ui/Icon";
import useToast from "../hooks/useToast";

const RoadmapCard = ({ item, showProgress = false, showVotes = false, className = "" }) => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const { toast } = useToast();
  const [voted, setVoted] = useState(false);
  const status = roadmapStatuses[item.status];

  const vote = () => {
    setVoted((v) => !v);
    if (!voted) toast(`Thanks! Your vote for “${item.title}” was counted.`, { tone: "info" });
  };

  return (
    <div
      ref={ref}
      className={`md:flex p-0.25 rounded-[2.5rem] transition-transform duration-300 hover:-translate-y-1 ${
        item.colorful ? "bg-conic-gradient" : "bg-n-6"
      } ${className}`}
    >
      <div className="relative flex flex-col w-full p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
        <div className="absolute top-0 left-0 max-w-full">
          <img className="w-full" src={grid} width={550} height={550} alt="" loading="lazy" />
        </div>
        <div className="relative z-1 flex flex-col flex-1">
          <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-20">
            <Tagline>{item.date}</Tagline>

            <div className="flex items-center px-4 py-1 bg-n-1 rounded text-n-8">
              {item.status === "planned" ? (
                <span className="w-2 h-2 mr-2.5 rounded-full" style={{ background: status.color }} />
              ) : (
                <img
                  className={`mr-2.5 ${item.status === "progress" ? "animate-spin-slow" : ""}`}
                  src={item.status === "done" ? check2 : loading1}
                  width={16}
                  height={16}
                  alt=""
                />
              )}
              <div className="tagline">{status.label}</div>
            </div>
          </div>

          <div className="mb-10 -my-10 -mx-15">
            <img className="w-full" src={item.imageUrl} width={628} height={426} alt={item.title} loading="lazy" />
          </div>
          <h3 className="h4 mb-4">{item.title}</h3>
          <p className="body-2 text-n-4">{item.text}</p>

          {(showProgress || showVotes) && (
            <div className="mt-auto pt-8">
              {showProgress && (
                <div className="mb-6">
                  <div className="flex justify-between mb-2 text-xs font-code uppercase tracking-wider text-n-4">
                    <span>Progress</span>
                    <span className="tabular-nums text-n-2">{item.progress}%</span>
                  </div>
                  <div
                    className="h-1.5 bg-n-6 rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={item.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${item.title} progress`}
                  >
                    <div
                      className="h-full rounded-full transition-[width] duration-[1400ms] ease-out"
                      style={{
                        width: inView ? `${item.progress}%` : "0%",
                        background: item.status === "done" ? status.color : "linear-gradient(90deg,#FFC876,#79FFF7,#9F53FF)",
                      }}
                    />
                  </div>
                </div>
              )}
              {showVotes && (
                <button
                  type="button"
                  onClick={vote}
                  aria-pressed={voted}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-colors ${
                    voted ? "border-color-1 bg-color-1/15 text-n-1" : "border-n-6 text-n-3 hover:border-n-4 hover:text-n-1"
                  }`}
                >
                  <Icon name="arrowUp" size={16} className={voted ? "text-color-1" : ""} />
                  <span className="tabular-nums">{(item.votes + (voted ? 1 : 0)).toLocaleString("en-US")}</span>
                  <span className="text-n-4">{voted ? "Voted" : "Upvote"}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;

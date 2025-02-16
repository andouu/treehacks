import { HiArrowUp } from "react-icons/hi";
import { LoadingIndicator } from "@/app/Components/LoadingIndicator";
import { useChat } from "@ai-sdk/react";
import { motion } from "motion/react";
import clsx from "clsx";
import { useAuth } from "@/app/Context/Auth";

const PromptWindow = () => {
  const { user } = useAuth();
  const { messages, input, handleInputChange, handleSubmit, status, stop } =
    useChat({
      headers: { "Content-Type": "application/json" },
      body: { user },
    });

  return (
    <div className="w-[530px] h-full flex flex-col justify-end resize-x border-l-2 border-neutral-100 overflow-hidden">
      <div className="relative h-full flex-1 overflow-hidden px-3 pt-5">
        {messages.length > 0 ? (
          <div className="flex-1 h-full flex flex-col justify-end overflow-hidden">
            <div className="flex flex-col gap-5 overflow-y-auto">
              <motion.span
                className="mt-auto text-center text-neutral-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Beginning of conversation
              </motion.span>
              {messages.map((m) => (
                <div key={m.id} className="flex gap-3">
                  {m.role === "assistant" && (
                    <div className="w-9 h-9 shrink-0 p-2 flex items-center justify-center rounded-full border border-neutral-100">
                      <img src="/logo_purple.svg" />
                    </div>
                  )}
                  <motion.div
                    className={clsx(
                      "flex-1 mt-1.5 whitespace-pre-wrap break-words",
                      m.role === "user" ? "text-end pl-3" : "text-start pr-3"
                    )}
                    style={{
                      transformOrigin: m.role === "user" ? "right" : "left",
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {m.role === "assistant" ? (
                      m.content.indexOf("</think>\n") === -1 ? (
                        <span className="text-neutral-400 italic">
                          Reasoning...
                        </span>
                      ) : (
                        m.content.slice(m.content.indexOf("</think>\n\n") + 10)
                      )
                    ) : (
                      m.content
                    )}
                  </motion.div>
                  {m.role === "user" && (
                    <div className="w-9 h-9 shrink-0 p-2 flex items-center justify-center rounded-full border border-neutral-100">
                      <img src="/orange_star.svg" />
                    </div>
                  )}
                </div>
              ))}
              {status === "submitted" && (
                <div className="flex gap-3">
                  <div className="w-9 h-9 shrink-0 p-2 flex items-center justify-center rounded-full border border-neutral-100">
                    <img src="/logo_purple.svg" />
                  </div>
                  <motion.div
                    className={clsx(
                      "flex-1 mt-1.5 whitespace-pre-wrap break-words text-start pr-3 text-neutral-400 italic"
                    )}
                    style={{
                      transformOrigin: "left",
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    Aaron is thinking...
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2">
            <img src="/logo.svg" className="w-30 h-30 object-contain" />
            <span className="w-80 text-sm text-neutral-400 text-center">
              Here, you can ask Aaron about the stock, our predictions, or
              general questions.
            </span>
          </div>
        )}
      </div>
      <div className="w-full h-48 p-5">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col grow-1 justify-end p-3 rounded-xl bg-neutral-100 gap-2"
        >
          <textarea
            autoFocus
            className="flex-1 focus:outline-none resize-none bg-transparent"
            placeholder="Message Aaron"
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            onChange={handleInputChange}
            maxLength={2000}
          />
          <div className="flex justify-between items-end">
            <span className="text-sm text-neutral-500">{input.length}</span>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 active:scale-90 transition-transform duration-150"
              type="submit"
              onClick={() => (status === "ready" ? undefined : stop())}
            >
              {status === "ready" ? (
                <HiArrowUp className="text-neutral-50 stroke-1" />
              ) : (
                <LoadingIndicator scale={0.175} fg="white" bg="darkgray" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptWindow;

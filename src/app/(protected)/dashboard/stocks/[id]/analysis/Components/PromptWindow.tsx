import { HiArrowUp } from "react-icons/hi";
import { LoadingIndicator } from "@/app/Components/LoadingIndicator";
import { useChat } from "@ai-sdk/react";
import { motion } from "motion/react";
import clsx from "clsx";

const PromptWindow = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="w-[530px] h-full flex flex-col justify-end resize-x border-l-2 border-neutral-100 overflow-hidden">
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden px-3 py-2">
        {messages.length > 0 ? (
          <div className="flex flex-col gap-5">
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
                    m.role === "user" ? "text-end" : "text-start"
                  )}
                  style={{ transformOrigin: "left" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {m.content}
                </motion.div>
                {m.role === "user" && (
                  <div className="w-9 h-9 shrink-0 p-2 flex items-center justify-center rounded-full border border-neutral-100">
                    <img src="/orange_star.svg" />
                  </div>
                )}
              </div>
            ))}
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
              type="submit"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 active:scale-90 transition-transform duration-150"
            >
              {true ? (
                <LoadingIndicator scale={0.175} fg="white" bg="darkgray" />
              ) : (
                <HiArrowUp className="text-neutral-50 stroke-1" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptWindow;

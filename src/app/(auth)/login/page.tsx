"use client";
import { LoadingIndicator } from "@/app/Components/LoadingIndicator";
import { INTERESTS } from "@/app/Constants/User";
import { User } from "@/app/Types/User";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Shapes1 = () => {
  return (
    <motion.div style={{ pointerEvents: "none" }}>
      <motion.img
        src="/pink_star.svg"
        className="absolute"
        initial={{ opacity: 0, filter: "blur(10px)", scale: 0 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 0.8 }}
        exit={{ y: 50, opacity: 0, filter: "blur(10px)", scale: 0.5 }}
        style={{ top: "5%", left: "5%" }}
      />
      <motion.img
        src="/wavy_lines.svg"
        className="absolute"
        initial={{ opacity: 0, filter: "blur(10px)", scale: 2 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        exit={{
          opacity: 0,
          filter: "blur(10px)",
          scale: 1.5,
          transition: { delay: 0.2 },
        }}
        transition={{ delay: 0.5 }}
        style={{ top: 0, right: 0 }}
      />
      <motion.img
        src="/orange_THING.svg"
        className="absolute"
        initial={{ opacity: 0, filter: "blur(10px)", scale: 0, rotate: -45 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1, rotate: 0 }}
        exit={{
          y: 100,
          opacity: 0,
          filter: "blur(10px)",
          scale: 0.5,
          rotate: -45,
          transition: { delay: 0.1 },
        }}
        transition={{ delay: 0.2 }}
        style={{ bottom: 0, left: "10%", transformOrigin: "bottom" }}
      />
      <motion.img
        src="/purple_block.svg"
        className="absolute"
        initial={{ opacity: 0, filter: "blur(10px)", scale: 0, rotate: -90 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 0.9, rotate: 0 }}
        exit={{ opacity: 0, filter: "blur(10px)", scale: 0.5, rotate: 90 }}
        transition={{ delay: 0.1 }}
        style={{ bottom: "5%", right: "5%", scale: 0.9 }}
      />
    </motion.div>
  );
};

const Shapes2 = () => {
  return (
    <motion.div style={{ pointerEvents: "none" }}>
      <motion.img
        src="/green_leaf.svg"
        className="absolute"
        initial={{ opacity: 0, filter: "blur(10px)", scale: 0, rotate: -90 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1, rotate: 0 }}
        exit={{ opacity: 0, filter: "blur(10px)", scale: 0.5, rotate: 90 }}
        style={{ top: "15%", right: "10%" }}
      />
      <motion.img
        src="/pink_THING.svg"
        className="absolute"
        initial={{
          x: 50,
          opacity: 0,
          filter: "blur(10px)",
          scale: 0,
          rotate: 90,
        }}
        animate={{ x: 0, opacity: 1, filter: "blur(0px)", scale: 1, rotate: 0 }}
        exit={{
          y: 50,
          opacity: 0,
          filter: "blur(10px)",
          scale: 0.5,
          rotate: -90,
        }}
        transition={{ delay: 0.1 }}
        style={{ bottom: "5%", left: "3.5%", scale: 0.9 }}
      />
    </motion.div>
  );
};

const FADE_VARIANTS = {
  initial: {
    opacity: 0,
    filter: "blur(10px)",
    scale: 0,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
  exit: {
    opacity: 0,
    filter: "blur(10px)",
    scale: 0.75,
  },
};

export default function Login() {
  const [stage, setStage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [experience, setExperience] = useState<User["experience"]>(0);
  const [riskTolerance, setRiskTolerance] = useState<
    User["riskTolerance"] | null
  >(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [saving, setSaving] = useState<boolean>(false);

  const stage2Valid = name && riskTolerance && selectedInterests.length > 0;
  const router = useRouter();

  const queryClient = useQueryClient();

  const handleSaveUser = async () => {
    if (!stage2Valid) return;

    try {
      setSaving(true);
      const user: User = {
        name,
        experience,
        riskTolerance,
        interests: selectedInterests,
      };
      await localStorage.setItem("auth", JSON.stringify(user));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStage(3);

      queryClient.invalidateQueries({ queryKey: ["auth"] });
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center">
      <AnimatePresence mode="wait">
        {stage === 1 ? (
          <Shapes1 key="shapes1" />
        ) : stage === 2 ? (
          <Shapes2 key="shapes2" />
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {stage === 1 ? (
          <motion.div
            key="form1"
            className="flex flex-col items-center"
            variants={FADE_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <span className="text-3xl">Welcome to EasyTrade!</span>
            <span className="mt-2">
              For your best experience, we kindly ask you to answer a few
              questions.
            </span>
            <button
              onClick={() => setStage(2)}
              className={clsx(
                "w-96 h-12 mt-10 text-white bg-neutral-950 rounded-full text-lg",
                "active:scale-95 transition-transform duration-150"
              )}
            >
              Continue
            </button>
          </motion.div>
        ) : stage === 2 ? (
          <motion.div
            key="form2"
            className="flex flex-col items-center"
            variants={FADE_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <span className="text-3xl">Tell us about yourself.</span>
            <span className="mt-2">
              We&apos;ll use this information to cater to your specific needs.
            </span>
            <div className="w-96 flex flex-col items-center mt-5 gap-5">
              <div>
                <span className="block w-full text-sm mb-1">Name</span>
                <input
                  className={clsx(
                    "w-96 h-12 border-2 border-neutral-150 text-center rounded-full",
                    "focus:border-brand focus:outline-none"
                  )}
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <span className="block w-full text-sm">Experience</span>
                <span className="block w-full text-sm mb-1 text-neutral-400">
                  0 meaning no experience, 10 meaning expert.
                </span>
                <div className="relative">
                  <progress
                    value={experience}
                    max={10}
                    className={clsx(
                      "absolute top-2 h-2 w-full appearance-none",
                      "[&::-webkit-progress-bar]:bg-neutral-100 [&::-webkit-progress-bar]:rounded-full",
                      "[&::-webkit-progress-value]:bg-brand",
                      experience > 3
                        ? "[&::-webkit-progress-value]:rounded-full"
                        : "[&::-webkit-progress-value]:rounded-l-full"
                    )}
                  />
                  <input
                    type="range"
                    className={clsx(
                      "w-96 border-0 accent-brand",
                      "appearance-none [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-neutral-100",
                      "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:-translate-y-1/4 [&::-webkit-slider-thumb]:hover:cursor-pointer"
                    )}
                    value={experience}
                    onChange={(e) =>
                      setExperience(
                        Number(e.target.value) as User["experience"]
                      )
                    }
                    step={1}
                    min={0}
                    max={10}
                  />
                  <div className="flex justify-between">
                    {Array.from({ length: 11 }, (_, i) => (
                      <span key={i} className="ml-1 text-sm text-center">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <span className="block w-full text-sm">Risk Tolerance</span>
                <span className="block w-full text-sm mb-3 text-neutral-400 leading-4">
                  How comfortable are you with seeing your money go up and down?
                </span>
                <div className="relative">
                  <div className="absolute -z-10 w-full h-12 rounded-full border-2 border-neutral-100 pointer-events-none" />
                  <div className="w-full h-12 flex">
                    <button
                      className={clsx(
                        "group flex-1 border-2 rounded-l-full",
                        "transition-colors duration-50",
                        riskTolerance === "LOW"
                          ? "border-green-500 bg-green-100"
                          : "border-transparent hover:border-neutral-200 hover:bg-neutral-50"
                      )}
                      onClick={() => setRiskTolerance("LOW")}
                    >
                      <div
                        className={clsx(
                          "group-active:scale-90 transition-transform duration-50",
                          riskTolerance === "LOW"
                            ? "text-green-600"
                            : "text-neutral-400"
                        )}
                      >
                        Low
                      </div>
                    </button>
                    <button
                      className={clsx(
                        "group flex-1 border-2",
                        "transition-colors duration-50",
                        riskTolerance === "MEDIUM"
                          ? "border-amber-500 bg-amber-100"
                          : "border-transparent border-x-neutral-100 hover:border-neutral-200 hover:bg-neutral-50"
                      )}
                      onClick={() => setRiskTolerance("MEDIUM")}
                    >
                      <div
                        className={clsx(
                          "group-active:scale-90 transition-transform duration-50",
                          riskTolerance === "MEDIUM"
                            ? "text-amber-600"
                            : "text-neutral-400"
                        )}
                      >
                        Med
                      </div>
                    </button>
                    <button
                      className={clsx(
                        "group flex-1 border-2 rounded-r-full",
                        "transition-colors duration-50",
                        riskTolerance === "HIGH"
                          ? "border-red-500 bg-red-100"
                          : "border-transparent hover:border-neutral-200 hover:bg-neutral-50"
                      )}
                      onClick={() => setRiskTolerance("HIGH")}
                    >
                      <div
                        className={clsx(
                          "group-active:scale-90 transition-transform duration-50",
                          riskTolerance === "HIGH"
                            ? "text-red-600"
                            : "text-neutral-400"
                        )}
                      >
                        High
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <span className="block w-full text-sm">Interests</span>
                <span className="block w-full text-sm mb-3 text-neutral-400 leading-4">
                  What do you want to get out of EasyTrade?
                </span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                  {INTERESTS.map((interest, i) => {
                    const selected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={i}
                        className={clsx(
                          "group px-5 py-1 rounded-full border-2 text-sm",
                          selected
                            ? "border-brand bg-purple-100"
                            : "border-neutral-100 hover:bg-neutral-50",
                          "transition-colors duration-50"
                        )}
                        onClick={() =>
                          setSelectedInterests((prev) =>
                            selected
                              ? prev.filter(
                                  (_interest) => _interest !== interest
                                )
                              : [...prev, interest]
                          )
                        }
                      >
                        <div
                          className={clsx(
                            "group-active:scale-95 transition-transform duration-50",
                            selected ? "text-brand" : "text-neutral-400"
                          )}
                        >
                          {interest}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <button
                className={clsx(
                  "w-full h-12 mt-10 flex items-center justify-center text-white bg-neutral-950 text-lg rounded-full",
                  "disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform duration-150"
                )}
                onClick={handleSaveUser}
                disabled={!stage2Valid || saving}
              >
                {saving ? (
                  <LoadingIndicator scale={0.25} fg="white" bg="gray" />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="w-full h-screen flex flex-col justify-center items-center text-white bg-brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-3xl">Thanks!</span>
            <span className="mt-2">
              That&apos;s all we needed. Welcome to EasyTrade!
            </span>
            <div className="relative w-80 h-1 my-5 bg-purple-500 rounded-full">
              <motion.div
                className="absolute l-0 w-full h-1 rounded-full bg-purple-200"
                initial={{ width: "100%" }}
                animate={{ width: 0 }}
                transition={{ duration: 5, ease: "linear" }}
                onAnimationComplete={() => router.replace("/dashboard")}
              />
            </div>
            <span className="text-sm text-purple-200">
              Automatically redirecting you...
            </span>
            <button
              className={clsx(
                "w-80 h-12 mt-10 text-center text-neutral-950 bg-white text-lg rounded-full",
                "active:scale-95 transition-transform duration-150"
              )}
              onClick={() => setStage(3)}
            >
              Go to dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

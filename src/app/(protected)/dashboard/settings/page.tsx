"use client";
import { LoadingIndicator } from "@/app/Components/LoadingIndicator";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Settings() {
  const queryClient = useQueryClient();

  const signOutMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("auth");
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <button
        className="w-80 h-12 flex items-center justify-center text-white bg-neutral-950 text-lg rounded-full disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform duration-150"
        onClick={() => signOutMutation.mutate()}
        disabled={signOutMutation.isPending}
      >
        {signOutMutation.isPending ? (
          <LoadingIndicator scale={0.25} fg="white" bg="darkgray" />
        ) : (
          "Sign Out"
        )}
      </button>
    </div>
  );
}

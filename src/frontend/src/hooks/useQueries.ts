import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Category } from "../backend";
import { useActor } from "./useActor";

export function useGalleryItems() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["gallery-items"],
    queryFn: async () => {
      if (!actor) return [];
      // Seed first, then fetch
      try {
        await actor.seedInitialGalleryItems();
      } catch {
        // Seed may fail if already seeded, ignore
      }
      return actor.getAllGalleryItems();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useGalleryItemsByCategory(category: Category | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["gallery-items", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === null) return actor.getAllGalleryItems();
      return actor.getGalleryItemsByCategory(category);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useGetContactSubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactSubmissions();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(name, email, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
    },
  });
}

// Get current owner principal
export function useGetOwner() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["owner"],
    queryFn: async () => {
      if (!actor) return "No owner set yet.";
      return actor.getOwner();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

// Claim ownership mutation
export function useClaimOwner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.claimOwner();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner"] });
    },
  });
}

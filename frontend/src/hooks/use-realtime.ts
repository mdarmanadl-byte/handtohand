"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/auth-store";

export function useRealtimeChannels() {
  const queryClient = useQueryClient();
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const socket = getSocket();

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("requests:subscribe");
    socket.emit("trips:subscribe");

    if (authUser?.id) {
      socket.emit("notifications:subscribe", authUser.id);
    }

    const refreshRequests = () => {
      void queryClient.invalidateQueries({ queryKey: ["requests"] });
    };

    const refreshTrips = () => {
      void queryClient.invalidateQueries({ queryKey: ["trips"] });
    };

    const refreshNotifications = () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    };

    socket.on("requests:updated", refreshRequests);
    socket.on("trips:updated", refreshTrips);
    socket.on("notifications:new", refreshNotifications);

    return () => {
      socket.off("requests:updated", refreshRequests);
      socket.off("trips:updated", refreshTrips);
      socket.off("notifications:new", refreshNotifications);
    };
  }, [authUser?.id, queryClient]);
}

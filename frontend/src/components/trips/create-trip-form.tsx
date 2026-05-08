"use client";

import { useState } from "react";
import { useCreateTripMutation } from "@/hooks/use-trips";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const placeOptions = [
  { id: "place-night-mess", label: "Night Mess" },
  { id: "place-nescafe", label: "Nescafe" },
  { id: "place-sda", label: "SDA Market" },
  {id: "place-satpura-nightmess-route", label: "Satpura-Night Mess Route"},
];

export function CreateTripForm() {
  const mutation = useCreateTripMutation();
  const [form, setForm] = useState({
    title: "Satpura to Night Mess",
    startPlaceId: "place-night-mess",
    destinationLabel: "Satpura Hostel",
    departureInMinutes: 15,
    availableSlots: 3,
    geofenceTag: "hostel-food-route",
    notes: "Can carry snacks, medicines, or stationery.",
  });

  function updateField<Key extends keyof typeof form>(key: Key, value: (typeof form)[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await mutation.mutateAsync(form);
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <Input
        value={form.title}
        onChange={(event) => updateField("title", event.target.value)}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <select
          className="h-11 rounded-xl border border-input bg-white/4 px-3 text-sm"
          value={form.startPlaceId}
          onChange={(event) => updateField("startPlaceId", event.target.value)}
        >
          {placeOptions.map((place) => (
            <option key={place.id} value={place.id}>
              {place.label}
            </option>
          ))}
        </select>
        <Input
          value={form.destinationLabel}
          onChange={(event) => updateField("destinationLabel", event.target.value)}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Input
          type="number"
          value={form.departureInMinutes}
          onChange={(event) =>
            updateField("departureInMinutes", Number(event.target.value))
          }
        />
        <Input
          type="number"
          value={form.availableSlots}
          onChange={(event) =>
            updateField("availableSlots", Number(event.target.value))
          }
        />
        <Input
          value={form.geofenceTag}
          onChange={(event) => updateField("geofenceTag", event.target.value)}
        />
      </div>
      <Textarea
        value={form.notes}
        onChange={(event) => updateField("notes", event.target.value)}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Broadcasting..." : "Broadcast trip"}
        </Button>
      </div>
    </form>
  );
}

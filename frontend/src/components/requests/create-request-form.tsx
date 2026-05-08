"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, CircleDollarSign, Clock3, MapPin, Package2 } from "lucide-react";
import { useCreateRequestMutation } from "@/hooks/use-requests";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/cn";

type RequestFormState = {
  title: string;
  description: string;
  itemName: string;
  type: "CONSUMABLE" | "BORROWABLE";
  placeId: string;
  rewardCoins: string;
  depositCoins: string;
  isUrgent: boolean;
  expiresInMinutes: string;
};

const placeOptions = [
  { id: "place-night-mess", label: "Night Mess" },
  { id: "place-nescafe", label: "Nescafe" },
  { id: "place-sda", label: "SDA Market" },
   {id: "place-satpura-nightmess-route", label: "Satpura-Night Mess Route"},
];

function FieldBlock({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <div className="space-y-1">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {hint ? (
          <p className="text-xs leading-5 text-muted-foreground">{hint}</p>
        ) : null}
      </div>
      {children}
    </label>
  );
}

function SelectField({
  value,
  onChange,
  options,
  icon: Icon,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ id: string; label: string }>;
  icon: typeof MapPin;
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <select
        className={cn(
          "h-11 w-full appearance-none rounded-xl border border-input bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] pl-10 pr-10 text-sm text-foreground outline-none transition",
          "focus-visible:ring-2 focus-visible:ring-ring ",
        )}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className="bg-[#0f1728] text-[#edf2ff]"
          >
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

export function CreateRequestForm() {
  const router = useRouter();
  const mutation = useCreateRequestMutation();
  const [form, setForm] = useState<RequestFormState>({
    title: "",
    description: "",
    itemName: "",
    type: "CONSUMABLE",
    placeId: "place-nescafe",
    rewardCoins: "",
    depositCoins: "",
    isUrgent: false,
    expiresInMinutes: "",
  });

  function updateField<Key extends keyof RequestFormState>(
    key: Key,
    value: RequestFormState[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await mutation.mutateAsync({
      ...form,
      rewardCoins: Number(form.rewardCoins) || 20,
      depositCoins: Number(form.depositCoins) || 0,
      expiresInMinutes: Number(form.expiresInMinutes) || 120,
    });
    router.push("/requests");
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div className="grid gap-5 rounded-[1.75rem] border border-border bg-white/3 p-5">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">What do you need?</p>
          <p className="text-xs leading-5 text-muted-foreground">
            Start with a short summary, then add enough detail so another student can accept confidently.
          </p>
        </div>

        <FieldBlock
          label="Request title"
          hint="This is the first thing people see in the requests feed."
        >
          <Input
            placeholder="Need meds from SDA before lab"
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
          />
        </FieldBlock>

        <FieldBlock
          label="Description"
          hint="Mention brand, quantity, hostel drop point, or anything urgent."
        >
          <Textarea
            placeholder="Example: Please get 1 strip of Crocin from SDA Medical. Drop at Satpura B-wing gate before 7 PM."
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
          />
        </FieldBlock>

        <FieldBlock
          label="Item name"
          hint="Keep this short so it reads well on cards and notifications."
        >
          <Input
            placeholder="Crocin, printouts, cold coffee combo..."
            value={form.itemName}
            onChange={(event) => updateField("itemName", event.target.value)}
          />
        </FieldBlock>
      </div>

      <div className="grid gap-5 rounded-[1.75rem] border border-border bg-white/3 p-5">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Routing and visibility</p>
          <p className="text-xs leading-5 text-muted-foreground">
            Tell the app where this request belongs and whether it is a consumable or a borrowable.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FieldBlock
            label="Request type"
            hint="Choose consumable for one-time deliveries, or borrowable for temporary item sharing."
          >
            <SelectField
              value={form.type}
              onChange={(value) =>
                updateField("type", value as "CONSUMABLE" | "BORROWABLE")
              }
              options={[
                { id: "CONSUMABLE", label: "Consumable delivery" },
                { id: "BORROWABLE", label: "Borrowable item" },
              ]}
              icon={Package2}
            />
          </FieldBlock>

          <FieldBlock
            label="Pickup place"
            hint="This helps matching and geofence notifications work correctly."
          >
            <SelectField
              value={form.placeId}
              onChange={(value) => updateField("placeId", value)}
              options={placeOptions}
              icon={MapPin}
            />
          </FieldBlock>
        </div>
      </div>

      <div className="grid gap-5 rounded-[1.75rem] border border-border bg-white/3 p-5">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Coins and timing</p>
          <p className="text-xs leading-5 text-muted-foreground">
            These values control helper incentives, escrow, and how long the request stays active.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FieldBlock
            label="Reward coins"
            hint="Coins paid to the helper after the request is completed."
          >
            <div className="relative">
              <CircleDollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="number"
                min="1"
                placeholder="20"
                className="pl-10  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={form.rewardCoins}
                onChange={(event) => updateField("rewardCoins", event.target.value)}
              />
            </div>
          </FieldBlock>

          <FieldBlock
            label="Deposit coins"
            hint="Optional escrow for borrowables or higher-value deliveries."
          >
            <div className="relative">
              <CircleDollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="number"
                min="0"
                placeholder="0"
                className="pl-10  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={form.depositCoins}
                onChange={(event) => updateField("depositCoins", event.target.value)}
              />
            </div>
          </FieldBlock>

          <FieldBlock
            label="Expires in"
            hint="How many minutes the request should stay active."
          >
            <div className="relative">
              <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="number"
                min="10"
                placeholder="120"
                className="pl-10  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={form.expiresInMinutes}
                onChange={(event) => updateField("expiresInMinutes", event.target.value)}
              />
            </div>
          </FieldBlock>
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 text-sm">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-[#7ef0b3]"
            checked={form.isUrgent}
            onChange={(event) => updateField("isUrgent", event.target.checked)}
          />
          <span className="space-y-1">
            <span className="block font-medium text-foreground">
              Mark this as urgent
            </span>
            <span className="block text-xs leading-5 text-muted-foreground">
              Urgent requests stand out visually, notify a wider helper pool, and usually need a stronger reward.
            </span>
          </span>
        </label>
      </div>

      {mutation.error ? (
        <p className="text-sm text-rose-300">{mutation.error.message}</p>
      ) : null}

      <div className="flex justify-end">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating request..." : "Create request"}
        </Button>
      </div>
    </form>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="page-gradient flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden rounded-[2rem] border border-border bg-[linear-gradient(140deg,rgba(121,168,255,0.18),rgba(126,240,179,0.08),rgba(10,15,28,0.96))] p-10 shadow-[0_30px_90px_rgba(2,8,23,0.32)] lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">HandToHand</p>
            <h1 className="mt-5 max-w-md text-4xl font-semibold leading-tight">
              Student movement becomes the campus delivery layer.
            </h1>
          </div>
          <div className="grid gap-4">
            <div className="rounded-2xl border border-border bg-black/14 p-4">
              <p className="text-sm font-medium">Urgent request matching</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Medicines, printouts, chargers, and quick hostel drop-offs move through one live feed.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-black/14 p-4">
              <p className="text-sm font-medium">Trip broadcasting with slots</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Heading from Satpura to Night Mess? Broadcast it and batch nearby requests in one walk.
              </p>
            </div>
          </div>
        </div>

        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}

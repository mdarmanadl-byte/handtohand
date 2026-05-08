import { PageHeader } from "@/components/common/page-header";
import { CreateRequestForm } from "@/components/requests/create-request-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateRequestPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="New Request"
        title="Create a campus help request"
        description="Consumables, medicines, urgent stationery, or borrowable needs can all start here with escrow-backed rewards."
      />

      <Card className="max-w-3xl rounded-[2rem]">
        <CardHeader>
          <CardTitle>Request details</CardTitle>
          <CardDescription>
            Keep it clear enough for another IITD student to accept it in seconds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateRequestForm />
        </CardContent>
      </Card>
    </div>
  );
}

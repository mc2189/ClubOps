import { RegisterMarkingClient } from "@/components/attendance/RegisterMarkingClient";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  return <RegisterMarkingClient sessionId={sessionId} />;
}

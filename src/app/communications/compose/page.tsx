import type { ComposeClientProps } from "@/components/communications/ComposeClient";
import { ComposeClient } from "@/components/communications/ComposeClient";

export default async function ComposePage({
  searchParams,
}: {
  searchParams: Promise<{ preset?: string; template?: string; group?: string }>;
}) {
  const params = await searchParams;
  const props: ComposeClientProps = {
    preset: params.preset ?? null,
    templateParam: params.template ?? null,
    groupParam: params.group ?? null,
  };

  return <ComposeClient {...props} />;
}

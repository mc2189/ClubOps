import { ImportFlowClient } from "@/components/finance/ImportFlowClient";
import { dataProvider } from "@/data/providers";

export default async function ImportPage() {
  const [csvPreview, pdfPreview, members] = await Promise.all([
    dataProvider.getImportPreview("csv"),
    dataProvider.getImportPreview("pdf"),
    dataProvider.getMemberProfiles(),
  ]);

  return (
    <ImportFlowClient csvPreview={csvPreview} pdfPreview={pdfPreview} members={members} />
  );
}

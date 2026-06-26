"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, PageHeader, Badge } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/communications/CommunicationsNotices";
import { CommunicationsSubNav } from "@/components/communications/CommunicationsSubNav";
import { useCommunicationsDemo } from "@/components/communications/CommunicationsDemoProvider";
import {
  applyTemplatePlaceholders,
  DEFAULT_PREVIEW_VARS,
  GIFT_AID_COMPOSE_PRESET,
  UNPAID_FEES_COMPOSE_PRESET,
} from "@/lib/communications";

export function ComposeClient() {
  const searchParams = useSearchParams();
  const { groups, templates, forms, saveDraft, simulateSend } = useCommunicationsDemo();

  const preset = searchParams.get("preset");
  const templateParam = searchParams.get("template");
  const groupParam = searchParams.get("group");

  const initialGroupId = useMemo(() => {
    if (groupParam) return groupParam;
    if (preset === "gift-aid") return GIFT_AID_COMPOSE_PRESET.groupId;
    if (preset === "unpaid-fees") return UNPAID_FEES_COMPOSE_PRESET.groupId;
    return groups[0]?.id ?? "";
  }, [preset, groupParam, groups]);

  const initialTemplateId = useMemo(() => {
    if (preset === "gift-aid") return GIFT_AID_COMPOSE_PRESET.templateId;
    if (preset === "unpaid-fees") return UNPAID_FEES_COMPOSE_PRESET.templateId;
    if (templateParam) return templateParam;
    return "";
  }, [preset, templateParam]);

  const initialFormId = useMemo(() => {
    if (preset === "gift-aid") return GIFT_AID_COMPOSE_PRESET.formId;
    return "";
  }, [preset]);

  const [groupId, setGroupId] = useState(initialGroupId);
  const [templateId, setTemplateId] = useState(initialTemplateId);
  const [formId, setFormId] = useState(initialFormId);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sentRef, setSentRef] = useState<string | null>(null);

  const selectedGroup = groups.find((g) => g.id === groupId);
  const selectedTemplate = templates.find((t) => t.id === templateId);
  const selectedForm = forms.find((f) => f.id === formId);

  useEffect(() => {
    setGroupId(initialGroupId);
    setTemplateId(initialTemplateId);
    setFormId(initialFormId);
  }, [initialGroupId, initialTemplateId, initialFormId]);

  useEffect(() => {
    const tpl = templates.find((t) => t.id === templateId);
    if (tpl) {
      setSubject(tpl.subject);
      setBody(tpl.body);
      if (tpl.linkedFormId) {
        setFormId(tpl.linkedFormId);
      }
    }
  }, [templateId, templates]);

  const previewSubject = applyTemplatePlaceholders(subject, DEFAULT_PREVIEW_VARS);
  const previewBody = applyTemplatePlaceholders(body, DEFAULT_PREVIEW_VARS);

  const handleSaveDraft = () => {
    saveDraft({ groupId, templateId: templateId || undefined, formId: formId || undefined, subject, body });
  };

  const handleSimulateSend = () => {
    if (!selectedGroup) return;
    const ref = simulateSend({
      groupId,
      groupName: selectedGroup.name,
      templateId: templateId || undefined,
      templateName: selectedTemplate?.name,
      formId: formId || undefined,
      formName: selectedForm?.name,
      subject,
      body,
    });
    setSentRef(ref);
  };

  const isGiftAidFlow = preset === "gift-aid" || groupId === GIFT_AID_COMPOSE_PRESET.groupId;

  return (
    <>
      <PageHeader
        title="Compose message"
        description="Select recipients, choose a template and simulate sending — no real email is sent."
      />
      <CommunicationsSubNav active="Compose" />
      <DemoOnlyNotice />

      {isGiftAidFlow && (
        <div className="mt-4 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
          <strong>Gift Aid declaration request</strong> — recipients: Parents missing Gift Aid
          declarations. Form attached: Gift Aid declaration. This is a simulated send only.
        </div>
      )}

      {sentRef && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
          Simulated send complete. Audit reference recorded. No real email was sent.
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Recipients</h2>
            <label className="mt-3 block text-xs font-medium text-slate-600">Recipient group</label>
            <select
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} ({g.recipientCount})
                </option>
              ))}
            </select>
            {selectedGroup && (
              <p className="mt-2 text-xs text-slate-500">
                Example: {selectedGroup.exampleRecipients.join(", ")}
              </p>
            )}
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Template & form</h2>
            <label className="mt-3 block text-xs font-medium text-slate-600">Template</label>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">None — write from scratch</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <label className="mt-3 block text-xs font-medium text-slate-600">Attach form</label>
            <select
              value={formId}
              onChange={(e) => setFormId(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">No form</option>
              {forms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Message</h2>
            <label className="mt-3 block text-xs font-medium text-slate-600">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
            <label className="mt-3 block text-xs font-medium text-slate-600">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Save draft (simulated)
              </button>
              <button
                type="button"
                onClick={handleSimulateSend}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Simulated send
              </button>
            </div>
            <p className="mt-2 text-xs text-amber-700">
              Demo only — no real email is sent.
            </p>
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Preview</h2>
            <Badge variant="warning">No real email sent</Badge>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Placeholders replaced with demo values for preview.
          </p>
          <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
            <p className="font-medium text-slate-900">To: {selectedGroup?.name}</p>
            <p className="mt-2 font-medium">Subject: {previewSubject || "(no subject)"}</p>
            {selectedForm && (
              <p className="mt-1 text-indigo-700">Form attached: {selectedForm.name}</p>
            )}
            <pre className="mt-4 whitespace-pre-wrap font-sans text-slate-700">{previewBody}</pre>
          </div>
        </Card>
      </div>
    </>
  );
}

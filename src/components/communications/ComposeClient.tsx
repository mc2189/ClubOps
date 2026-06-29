"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { DemoLoadingCard } from "@/components/demo/DemoLoadingCard";
import { InlineActionFeedback } from "@/components/demo/InlineActionFeedback";
import { DemoOnlyNotice } from "@/components/communications/CommunicationsNotices";
import { CommunicationsSubNav } from "@/components/communications/CommunicationsSubNav";
import { ComposeReasonPanel } from "@/components/communications/ComposeReasonPanel";
import { useCommunicationsDemo } from "@/components/communications/CommunicationsDemoProvider";
import {
  applyTemplatePlaceholders,
  DEFAULT_PREVIEW_VARS,
} from "@/lib/communications";
import {
  buildComposeContext,
  COMPOSE_PRESETS,
  DEMO_PREVIEW_FOOTER,
  getComposePreset,
  isComposePresetId,
  SIMULATED_SEND_CONFIRMATION,
} from "@/lib/communicationsCompose";
import { PermissionPreviewNotice } from "@/components/rbac/PermissionPreviewNotice";
import { communicationsTrail } from "@/lib/breadcrumbs";

export interface ComposeClientProps {
  preset?: string | null;
  templateParam?: string | null;
  groupParam?: string | null;
}

function resolveInitialIds(
  preset: string | null,
  templateParam: string | null,
  groupParam: string | null,
  fallbackGroupId: string,
) {
  const presetConfig = getComposePreset(preset);

  let groupId = groupParam ?? fallbackGroupId;
  let templateId = templateParam ?? "";
  let formId = "";

  if (presetConfig) {
    groupId = presetConfig.groupId;
    templateId = presetConfig.templateId;
    formId = presetConfig.formId ?? "";
  } else if (templateParam === "tpl-competition") {
    groupId = COMPOSE_PRESETS.competition.groupId;
    templateId = "tpl-competition";
  }

  return { groupId, templateId, formId };
}

export function ComposeClient({
  preset = null,
  templateParam = null,
  groupParam = null,
}: ComposeClientProps) {
  const { groups, templates, forms, saveDraft, simulateSend } = useCommunicationsDemo();

  const fallbackGroupId = groups[0]?.id ?? "";

  const initial = useMemo(
    () => resolveInitialIds(preset, templateParam, groupParam, fallbackGroupId),
    [preset, templateParam, groupParam, fallbackGroupId],
  );

  const [groupId, setGroupId] = useState(initial.groupId);
  const [templateId, setTemplateId] = useState(initial.templateId);
  const [formId, setFormId] = useState(initial.formId);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sentRef, setSentRef] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [loadTimedOut, setLoadTimedOut] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const sendFeedbackRef = useRef<HTMLDivElement>(null);

  const presetConfig = getComposePreset(preset);
  const expectsTemplateContent = Boolean(presetConfig?.templateId || templateParam);

  const selectedGroup = groups.find((g) => g.id === groupId);
  const selectedTemplate = templates.find((t) => t.id === templateId);
  const selectedForm = forms.find((f) => f.id === formId);

  const composeContext = useMemo(
    () => buildComposeContext(preset, selectedGroup, selectedTemplate),
    [preset, selectedGroup, selectedTemplate],
  );

  useEffect(() => {
    const next = resolveInitialIds(preset, templateParam, groupParam, fallbackGroupId);
    setGroupId(next.groupId);
    setTemplateId(next.templateId);
    setFormId(next.formId);
    setSubject("");
    setBody("");
    setSentRef(null);
    setInitialized(true);
    setLoadTimedOut(false);
    setContentReady(!next.templateId);
  }, [preset, templateParam, groupParam, fallbackGroupId]);

  useEffect(() => {
    if (initialized && groups.length > 0) return;
    const timer = window.setTimeout(() => setLoadTimedOut(true), 2500);
    return () => window.clearTimeout(timer);
  }, [initialized, groups.length]);

  useEffect(() => {
    if (!templateId) {
      setContentReady(true);
      return;
    }
    const tpl = templates.find((t) => t.id === templateId);
    if (tpl) {
      setSubject(tpl.subject);
      setBody(tpl.body);
      if (tpl.linkedFormId) {
        setFormId(tpl.linkedFormId);
      }
      setContentReady(true);
    }
  }, [templateId, templates]);

  const previewSubject = applyTemplatePlaceholders(subject, DEFAULT_PREVIEW_VARS);
  const previewBody =
    applyTemplatePlaceholders(body, DEFAULT_PREVIEW_VARS) + DEMO_PREVIEW_FOOTER;

  const handleSaveDraft = () => {
    saveDraft({
      groupId,
      templateId: templateId || undefined,
      formId: formId || undefined,
      subject,
      body,
    });
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

  useEffect(() => {
    if (!sentRef || !sendFeedbackRef.current) return;
    sendFeedbackRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [sentRef]);

  if (!initialized || groups.length === 0) {
    if (loadTimedOut) {
      return (
        <>
          <PageHeader
            title="Compose message"
            description="Prepare a demo message with clear recipient reasons — nothing is really sent."
            breadcrumbs={communicationsTrail("Compose")}
            backHref="/communications"
          />
          <CommunicationsSubNav active="Compose" />
          <DemoLoadingCard
            title="Could not prepare this demo message"
            description="The composer did not load in time. Choose a template, go back to Communications, or try the unpaid fees example."
            backHref="/communications"
            backLabel="Back to Communications"
          >
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link
                href="/communications/templates"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Choose template
              </Link>
              <Link
                href="/communications/compose?preset=unpaid-fees"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Use unpaid fees preset
              </Link>
            </div>
          </DemoLoadingCard>
        </>
      );
    }

    return (
      <>
        <PageHeader
          title="Compose message"
          description="Prepare a demo message with clear recipient reasons — nothing is really sent."
          breadcrumbs={communicationsTrail("Compose")}
          backHref="/communications"
        />
        <CommunicationsSubNav active="Compose" />
        <DemoLoadingCard
          title="Preparing the demo message…"
          description="The template and recipient group are being filled from the selected demo task. No real email or text will be sent."
          backHref="/communications"
          backLabel="Back to Communications"
          preparing
        />
      </>
    );
  }

  const isPreparingPreset =
    initialized && groups.length > 0 && expectsTemplateContent && templateId && !contentReady;

  if (isPreparingPreset) {
    return (
      <>
        <PageHeader
          title="Compose message"
          description="Prepare a demo message with clear recipient reasons — nothing is really sent."
          breadcrumbs={communicationsTrail("Compose")}
          backHref="/communications"
        />
        <CommunicationsSubNav active="Compose" />
        <DemoLoadingCard
          title="Preparing the demo message…"
          description="The template and recipient group are being filled from the selected demo task. No real email or text will be sent."
          backHref="/communications"
          backLabel="Back to Communications"
          preparing
        />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Compose message"
        description="Prepare a demo message with clear recipient reasons — nothing is really sent."
        breadcrumbs={communicationsTrail("Compose")}
        backHref="/communications"
      />
      <CommunicationsSubNav active="Compose" />
      <DemoOnlyNotice />
      <PermissionPreviewNotice module="communications" action="send" />

      <ComposeReasonPanel
        context={composeContext}
        template={selectedTemplate}
        group={selectedGroup}
      />

      {isComposePresetId(preset) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.values(COMPOSE_PRESETS)
            .filter((p) => p.id !== preset)
            .slice(0, 3)
            .map((p) => (
              <Link
                key={p.id}
                href={`/communications/compose?preset=${p.id}`}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Try: {p.label}
              </Link>
            ))}
        </div>
      )}

      <div className="mt-6 grid gap-6 pb-24 lg:grid-cols-2 lg:pb-6">
        <div className="space-y-4">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Recipients</h2>
            <label htmlFor="compose-group" className="mt-3 block text-xs font-medium text-slate-600">
              Recipient group
            </label>
            <select
              id="compose-group"
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
              <div className="mt-2 space-y-1 text-xs text-slate-600">
                <p>
                  <span className="font-medium text-slate-700">Why included: </span>
                  {selectedGroup.whyIncluded ?? selectedGroup.description}
                </p>
                <p>
                  <span className="font-medium text-slate-700">Examples (demo): </span>
                  {selectedGroup.exampleRecipients.join(", ")}
                </p>
                {selectedGroup.isDynamic && (
                  <p className="text-slate-500">Dynamic group (simulated from demo records)</p>
                )}
              </div>
            )}
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Template &amp; form</h2>
            <label htmlFor="compose-template" className="mt-3 block text-xs font-medium text-slate-600">
              Template
            </label>
            <select
              id="compose-template"
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
            {selectedTemplate && (
              <p className="mt-2 text-xs text-slate-600">
                {selectedTemplate.whenToUse ?? selectedTemplate.purpose}
                {selectedTemplate.needsReviewBeforeSend && (
                  <span className="mt-1 block font-medium text-amber-800">
                    Volunteer should review before sending.
                  </span>
                )}
              </p>
            )}
            <label htmlFor="compose-form" className="mt-3 block text-xs font-medium text-slate-600">
              Attach form
            </label>
            <select
              id="compose-form"
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
            <label htmlFor="compose-subject" className="mt-3 block text-xs font-medium text-slate-600">
              Subject
            </label>
            <input
              id="compose-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
            <label htmlFor="compose-body" className="mt-3 block text-xs font-medium text-slate-600">
              Body
            </label>
            <textarea
              id="compose-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="min-h-[48px] w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Save draft (simulated)
              </button>
              <button
                type="button"
                onClick={handleSimulateSend}
                className="min-h-[48px] w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Simulate send
              </button>
            </div>
            <div ref={sendFeedbackRef}>
              {sentRef && (
                <InlineActionFeedback
                  className="mt-3"
                  message={`${SIMULATED_SEND_CONFIRMATION} Simulated audit reference: ${sentRef}.`}
                />
              )}
            </div>
            <p className="mt-2 text-xs text-amber-800">
              Demo only — no real emails or texts sent. No contact data is real.
            </p>
          </Card>
        </div>

        <Card className="h-fit">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-900">Message preview</h2>
            <Badge variant="warning">Simulated only</Badge>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Placeholders replaced with demo values. Footer added for safety.
          </p>
          <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
            <p className="text-xs text-slate-500">
              To: {selectedGroup?.name} ({selectedGroup?.recipientCount ?? 0} demo parents)
            </p>
            <p className="mt-3 font-medium text-slate-900">
              Subject: {previewSubject || "(no subject)"}
            </p>
            {selectedForm && (
              <p className="mt-1 text-indigo-700">Form attached: {selectedForm.name}</p>
            )}
            <div className="mt-4 whitespace-pre-wrap text-slate-700">{previewBody}</div>
          </div>
        </Card>
      </div>
    </>
  );
}

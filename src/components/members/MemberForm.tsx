"use client";

import { useState, type FormEvent } from "react";
import type { MemberFormData, ConsentStatus, GiftAidStatus } from "@/data/providers/types";
import { CLASS_GROUPS, emptyFormData } from "@/lib/members";
import { DemoOnlyNotice, SensitiveDataNotice } from "@/components/members/MemberNotices";

interface MemberFormProps {
  initialData?: MemberFormData;
  submitLabel: string;
  onSubmit: (data: MemberFormData) => void;
  onCancel: () => void;
}

export function MemberForm({ initialData, submitLabel, onSubmit, onCancel }: MemberFormProps) {
  const [form, setForm] = useState<MemberFormData>(initialData ?? emptyFormData);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(form);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  }

  function updateField<K extends keyof MemberFormData>(key: K, value: MemberFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DemoOnlyNotice />

      {success && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          Saved successfully (demo session only).
        </div>
      )}

      <fieldset className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
        <legend className="text-base font-semibold text-slate-900">Member details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="First name" required>
            <input
              type="text"
              required
              value={form.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField label="Last name" required>
            <input
              type="text"
              required
              value={form.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField label="Date of birth" required>
            <input
              type="date"
              required
              value={form.dateOfBirth}
              onChange={(e) => updateField("dateOfBirth", e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField label="Class / group" required>
            <select
              required
              value={form.classGroup}
              onChange={(e) => updateField("classGroup", e.target.value)}
              className={inputClass}
            >
              {CLASS_GROUPS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
        <legend className="text-base font-semibold text-slate-900">Parent / carer</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Name">
            <input
              type="text"
              value={form.parentCarerName}
              onChange={(e) => updateField("parentCarerName", e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField label="Email">
            <input
              type="email"
              value={form.parentCarerEmail}
              onChange={(e) => updateField("parentCarerEmail", e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField label="Phone">
            <input
              type="tel"
              value={form.parentCarerPhone}
              onChange={(e) => updateField("parentCarerPhone", e.target.value)}
              className={inputClass}
            />
          </FormField>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
        <legend className="text-base font-semibold text-slate-900">Emergency contact</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Contact name">
            <input
              type="text"
              value={form.emergencyContactName}
              onChange={(e) => updateField("emergencyContactName", e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField label="Contact phone">
            <input
              type="tel"
              value={form.emergencyContactPhone}
              onChange={(e) => updateField("emergencyContactPhone", e.target.value)}
              className={inputClass}
            />
          </FormField>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
        <legend className="text-base font-semibold text-slate-900">Authorised pickup</legend>
        <FormField label="Authorised pickup people" hint="Separate multiple names with semicolons. Add notes in brackets, e.g. David Thompson (Father)">
          <textarea
            rows={2}
            value={form.authorisedPickupNotes}
            onChange={(e) => updateField("authorisedPickupNotes", e.target.value)}
            className={inputClass}
          />
        </FormField>
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border border-red-200 bg-red-50/30 p-5">
        <legend className="text-base font-semibold text-red-900">Medical information</legend>
        <SensitiveDataNotice area="Medical & welfare" />
        <div className="mt-4 grid gap-4">
          <FormField label="Allergies" hint="Comma-separated">
            <input
              type="text"
              value={form.allergies}
              onChange={(e) => updateField("allergies", e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField label="Medical notes">
            <textarea
              rows={3}
              value={form.medicalNotes}
              onChange={(e) => updateField("medicalNotes", e.target.value)}
              className={inputClass}
            />
          </FormField>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
        <legend className="text-base font-semibold text-slate-900">Consent & Gift Aid</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Consent status">
            <select
              value={form.consentStatus}
              onChange={(e) => updateField("consentStatus", e.target.value as ConsentStatus)}
              className={inputClass}
            >
              <option value="complete">Complete</option>
              <option value="partial">Partial</option>
              <option value="missing">Missing</option>
            </select>
          </FormField>
          <FormField label="Gift Aid declaration">
            <select
              value={form.giftAidStatus}
              onChange={(e) => updateField("giftAidStatus", e.target.value as GiftAidStatus)}
              className={inputClass}
            >
              <option value="declared">Declared</option>
              <option value="missing">Missing</option>
              <option value="expired">Expired</option>
              <option value="n/a">N/A</option>
            </select>
          </FormField>
        </div>
      </fieldset>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

function FormField({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {hint && <span className="mt-0.5 block text-xs text-slate-400">{hint}</span>}
      <div className="mt-1">{children}</div>
    </label>
  );
}

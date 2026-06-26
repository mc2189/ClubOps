"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { MemberForm } from "@/components/members/MemberForm";
import { useMembersDemo } from "@/components/members/MembersDemoProvider";
import { profileToFormData } from "@/lib/members";

export function AddMemberClient() {
  const router = useRouter();
  const { addMember } = useMembersDemo();

  return (
    <>
      <PageHeader
        title="Add member"
        description="Register a new gymnast or member. Demo only — changes reset on refresh."
      />
      <MemberForm
        submitLabel="Add member"
        onSubmit={(data) => {
          const id = addMember(data);
          router.push(`/members/${id}`);
        }}
        onCancel={() => router.push("/members")}
      />
    </>
  );
}

export function EditMemberClient({ memberId }: { memberId: string }) {
  const router = useRouter();
  const { getProfile, updateMember } = useMembersDemo();
  const profile = getProfile(memberId);

  if (!profile) {
    return (
      <PageHeader
        title="Member not found"
        description="This member record does not exist."
      />
    );
  }

  return (
    <>
      <PageHeader
        title={`Edit — ${profile.firstName} ${profile.lastName}`}
        description="Update member details. Demo only — changes reset on refresh."
      />
      <MemberForm
        initialData={profileToFormData(profile)}
        submitLabel="Save changes"
        onSubmit={(data) => {
          updateMember(memberId, data);
          router.push(`/members/${memberId}`);
        }}
        onCancel={() => router.push(`/members/${memberId}`)}
      />
    </>
  );
}

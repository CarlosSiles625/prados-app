"use server";

import { deleteIntern, updateIntern } from "@/services/interns";
import { createRecord } from "@/services/record";

export async function dischargeIntern(formdata: FormData) {
  const id = formdata.get("id") as string;
  const outAt = formdata.get("out_at") as string | undefined;
  return await updateIntern(id, {
    status: "Alta",
    out_at: outAt ? new Date(outAt).toISOString() : new Date().toISOString(),
    finished_program: true,
  });
}

export async function downIntern(formdata: FormData) {
  const id = formdata.get("id") as string;
  const outAt = formdata.get("out_at") as string | undefined;
  const reason = formdata.get("reason") as string;
  const observations = formdata.get("observations") as string;
  const outProperties = {
    reason,
    observations,
  };

  return await updateIntern(id, {
    status: "Baja",
    out_at: outAt ? new Date(outAt).toISOString() : new Date().toISOString(),
    finished_program: false,
    out_properties: outProperties,
  });
}

export async function addRecord(formData: FormData) {
  const userId = formData.get("userId") as string;
  const internId = formData.get("internId") as string;
  const notes = formData.get("notes") as string;
  return await createRecord({
    notes,
    user: {
      connect: {
        id: userId,
      },
    },
    intern: {
      connect: {
        id: internId,
      },
    },
  });
}

export async function deleteInternAction(formData: FormData) {
  const id = formData.get("id") as string;
  return await deleteIntern(id);
}

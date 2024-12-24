"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { PostSchema, siteSchema } from "@/app/utils/zod-schema";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/require-user";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateSiteAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: siteSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.site.create({
    data: {
      description: submission.value.description,
      name: submission.value.name,
      subdirectory: submission.value.subdirectory,
      userId: user.id,
    },
  });

  return redirect("/dashboard/sites");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreatePostAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.post.create({
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
      userId: user.id,
      siteId: formData.get("siteId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function EditPostActions(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = await prisma.post.update({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function DeletePost(formData: FormData) {
  const user = await requireUser();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = await prisma.post.delete({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

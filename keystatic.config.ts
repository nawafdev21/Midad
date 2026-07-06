import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "nawafdev21/Midad",
  },
  collections: {
    blog: collection({
      label: "مقالات",
      slugField: "entrySlug",
      path: "src/content/blog/*",
      format: { contentField: "body" },
      schema: {
        entrySlug: fields.slug({ name: { label: "معرّف الملف (تلقائي، لا تحتاج تلمسه)" } }),
        title: fields.text({ label: "العنوان" }),
        slug: fields.text({ label: "الرابط (slug)" }),
        author: fields.text({ label: "الكاتب" }),
        date: fields.date({ label: "التاريخ" }),
        cover: fields.image({
          label: "صورة الغلاف",
          directory: "src/assets/covers",
          publicPath: "../../assets/covers/",
        }),
        description: fields.text({ label: "الوصف المختصر", multiline: true }),
        readingTime: fields.integer({
          label: "وقت القراءة بالدقائق (اختياري — يُحسب تلقائياً لو تُرك فارغاً)",
          validation: { isRequired: false },
        }),
        tags: fields.array(fields.text({ label: "وسم" }), {
          label: "الوسوم",
          itemLabel: (props) => props.value || "وسم جديد",
        }),
        sources: fields.array(fields.text({ label: "مصدر" }), {
          label: "المصادر (اختياري)",
          itemLabel: (props) => props.value || "مصدر جديد",
        }),
        draft: fields.checkbox({ label: "مسودة (غير منشور)", defaultValue: false }),
        body: fields.markdoc({ label: "نص المقال", extension: "md" }),
      },
    }),
    projects: collection({
      label: "كتب وأفلام",
      slugField: "entrySlug",
      path: "src/content/projects/*",
      schema: {
        entrySlug: fields.slug({ name: { label: "معرّف الملف (تلقائي، لا تحتاج تلمسه)" } }),
        title: fields.text({ label: "العنوان" }),
        slug: fields.text({ label: "الرابط (slug)" }),
        type: fields.select({
          label: "النوع",
          options: [
            { label: "كتاب", value: "كتاب" },
            { label: "فيلم", value: "فيلم" },
          ],
          defaultValue: "كتاب",
        }),
        cover: fields.image({
          label: "صورة الغلاف",
          directory: "src/assets/covers",
          publicPath: "../../assets/covers/",
        }),
        description: fields.text({ label: "الوصف", multiline: true }),
        year: fields.integer({ label: "السنة" }),
        link: fields.url({ label: "رابط خارجي (اختياري)", validation: { isRequired: false } }),
      },
    }),
  },
});

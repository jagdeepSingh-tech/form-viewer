export const groupFieldsBySection = (fields) => {
    if (!Array.isArray(fields) || fields.length === 0) return [];

    const sections = [];
    let currentSection = {
        title: "General",
        fields: [],
    };

    fields.forEach((field) => {
        if (field.type === "section") {
            // Push the previous section if it has any fields or if we want to preserve empty sections
            // However, typical behavior is to push the previous one and start a new one.
            // But if the FIRST field is a section, the "General" section might be empty.

            if (currentSection.fields.length > 0 || currentSection.title !== "General") {
                sections.push(currentSection);
            }

            currentSection = {
                title: field.label || "Untitled Section",
                fields: [],
            };
        } else {
            currentSection.fields.push(field);
        }
    });

    // Push the final section
    if (currentSection.fields.length > 0 || currentSection.title !== "General") {
        sections.push(currentSection);
    }

    return sections;
};

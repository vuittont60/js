/**
 * @internal
 * @param name
 * @param metadata
 * @param type
 */
export function extractCommentFromMetadata(
  name: string | undefined,
  metadata: Record<string, any> | undefined,
  type: "methods" | "events",
) {
  return (
    metadata?.output?.userdoc?.[type]?.[
      Object.keys(metadata?.output?.userdoc[type] || {}).find((fn) =>
        fn.includes(name || "unknown"),
      ) || ""
    ]?.notice ||
    metadata?.output?.devdoc?.[type]?.[
      Object.keys(metadata?.output?.devdoc[type] || {}).find((fn) =>
        fn.includes(name || "unknown"),
      ) || ""
    ]?.details
  );
}

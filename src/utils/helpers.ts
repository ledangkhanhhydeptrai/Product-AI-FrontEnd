export const formatChatText = (text: string) => {
  console.log("FORMAT INPUT:", text);
  if (!text) return "";

  return text
    .replace(/\n/g, "<br/>")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
};
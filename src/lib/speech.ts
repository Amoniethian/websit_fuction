import { toast } from "../ui/toast";

/** Speak an English string via the Web Speech API (slowed for study). */
export function speak(text: string): void {
  if (!("speechSynthesis" in window)) {
    toast("浏览器不支持朗读");
    return;
  }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.88;
  speechSynthesis.speak(u);
}

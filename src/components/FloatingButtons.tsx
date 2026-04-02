import { MessageCircle, Send } from 'lucide-react';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
      <a
        href="https://t.me/maminre"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(200,80%,50%)] text-white shadow-lg hover:scale-110 transition-transform"
        aria-label="تلگرام"
      >
        <Send size={20} />
      </a>
      <a
        href="https://wa.me/989120000000"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(142,70%,45%)] text-white shadow-lg hover:scale-110 transition-transform"
        aria-label="واتساپ"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}

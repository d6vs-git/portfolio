import Image from "next/image";

export const HappyClients = () => (
  <div className="flex items-center space-x-4">
    <div className="flex space-x-[-10px]">
      <span className="inline-flex items-center justify-center rounded-full bg-green-200 w-10 h-10 text-lg border-4 border-white shadow">
        <Image
          src="/assets/emojis/emoji-1.png"
          alt="emoji-1"
          width={32}
          height={32}
        />
      </span>
      <span className="inline-flex items-center justify-center rounded-full bg-pink-200 w-10 h-10 text-lg border-4 border-white shadow">
        <Image
          src="/assets/emojis/emoji-2.png"
          alt="emoji-2"
          width={32}
          height={32}
        />
      </span>
      <span className="inline-flex items-center justify-center rounded-full bg-green-200 w-10 h-10 text-lg border-4 border-white shadow">
        <Image
          src="/assets/emojis/emoji-1.png"
          alt="emoji-1"
          width={32}
          height={32}
        />
      </span>
    </div>
    <span className="text-md text-muted-foreground">20+ Successful Projects</span>
  </div>
);

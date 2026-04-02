import Image from "next/image";

interface CardProps {
  title?: string;
  className?: string;
}

export default function BulbasaurCard({ title = "PITCH ARENA", className = "" }: CardProps) {
  return (
    <div
      className={`relative bg-white border-black flex flex-col items-center ${className}`}
      style={{
        "--card-w": "clamp(160px, 30vw, 320px)",
        width: "var(--card-w)",
        borderRadius: "calc(var(--card-w) * 0.125)",
        borderWidth: "max(2px, calc(var(--card-w) * 0.01))",
      } as React.CSSProperties}
    >

      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#5AC178] border-black rounded-full flex items-center justify-center shadow-sm"
        style={{
            width: "calc(var(--card-w) * 0.18)",
            height: "calc(var(--card-w) * 0.18)",
            borderWidth: "max(1px, calc(var(--card-w) * 0.007))",
            padding: "calc(var(--card-w) * 0.03)"
        }}
      >
        <div className="relative w-full h-full">
          <Image src="/pokemons/leaf.png" alt="Leaf" fill className="object-contain" />
        </div>
      </div>

      <div 
        className="bg-[#83CCB147] w-full flex justify-center items-center border-b border-gray-100 overflow-hidden"
        style={{
            paddingTop: "calc(var(--card-w) * 0.12)",
            paddingBottom: "calc(var(--card-w) * 0.06)",
            borderTopLeftRadius: "calc(var(--card-w) * 0.115)",
            borderTopRightRadius: "calc(var(--card-w) * 0.115)",
        }}
      >
        <div className="relative" style={{ width: "calc(var(--card-w) * 0.65)", height: "calc(var(--card-w) * 0.65)" }}>
          <Image src="/pokemons/bulbasaur.png" alt="Bulbasaur" fill className="object-contain" />
        </div>
      </div>

      <div className="w-full flex flex-col items-center text-center" style={{ padding: "calc(var(--card-w) * 0.06)" }}>
        <h3 
            className="font-black tracking-tight text-black uppercase"
            style={{ fontSize: "calc(var(--card-w) * 0.075)", marginBottom: "calc(var(--card-w) * 0.01)" }}
        >
          {title}
        </h3>
        <p 
            className="font-bold text-gray-400 tracking-widest uppercase"
            style={{ fontSize: "calc(var(--card-w) * 0.035)", marginBottom: "calc(var(--card-w) * 0.04)" }}
        >
          STRATEGY TYPE
        </p>

        <div className="grid grid-cols-2 w-full" style={{ gap: "calc(var(--card-w) * 0.02)", marginBottom: "calc(var(--card-w) * 0.02)" }}>
          <span className="bg-[#FFD9C3] text-black font-bold rounded-full border border-[#FBB993]" style={{ fontSize: "calc(var(--card-w) * 0.032)", padding: "calc(var(--card-w) * 0.02) 0" }}>
            Speed Demon
          </span>
          <span className="bg-[#CCB8E0] text-black font-bold rounded-full border border-[#A890C8]" style={{ fontSize: "calc(var(--card-w) * 0.032)", padding: "calc(var(--card-w) * 0.02) 0" }}>
            Precision Master
          </span>
        </div>
         <span 
            className="bg-[#CEF2FF] text-black font-bold rounded-full border border-[#A6E0F4]" 
            style={{ width: "60%", fontSize: "calc(var(--card-w) * 0.032)", padding: "calc(var(--card-w) * 0.02) 0" }}
         >
            Combo Builder
          </span>
      </div>
    </div>
  );
}
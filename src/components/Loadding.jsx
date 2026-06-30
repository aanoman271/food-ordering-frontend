const Loadding = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        {/* Minimal hardware-accelerated ledger spinner */}
        <div className="w-5 h-5 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />

        {/* High precision tracking label */}
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 select-none animate-pulse">
          Synchronizing Ledger
        </span>
      </div>
    </div>
  );
};

export default Loadding;

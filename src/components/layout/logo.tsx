export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className} group`}>
      <img
        src="/images/Plantro%20Logo.png"
        alt="Plantro"
        className="h-20 w-auto transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-3"
      />
    </div>
  );
}

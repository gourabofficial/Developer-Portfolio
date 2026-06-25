import { personal } from "@/data/personal";

export function TerminalBlock() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-elevated">
      {/* ─── Header Bar ─── */}
      <div className="bg-muted h-8 flex items-center px-4 gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
        <span className="font-mono text-xs text-muted-foreground ml-2">
          gourab@portfolio:~
        </span>
      </div>

      {/* ─── Terminal Content ─── */}
      <div className="bg-background/50 p-6 font-mono text-sm leading-relaxed">
        {/* Command 1: whoami */}
        <div className="mb-4">
          <p>
            <span className="text-accent">➜</span>{" "}
            <span className="text-foreground">~ whoami</span>
          </p>
          <p className="text-muted-foreground">
            {personal.name} — {personal.title}
          </p>
        </div>

        {/* Command 2: cat about.txt */}
        <div className="mb-4">
          <p>
            <span className="text-accent">➜</span>{" "}
            <span className="text-foreground">~ cat about.txt</span>
          </p>
          <p className="text-muted-foreground">
            Building enterprise applications with .NET,
          </p>
          <p className="text-muted-foreground">React and SQL Server.</p>
          <p className="text-muted-foreground mt-2">
            Focused on backend engineering, clean architecture,
          </p>
          <p className="text-muted-foreground">
            and creating products that scale.
          </p>
        </div>

        {/* Command 3: pwd */}
        <div className="mb-4">
          <p>
            <span className="text-accent">➜</span>{" "}
            <span className="text-foreground">~ pwd</span>
          </p>
          <p className="text-muted-foreground">
            /home/gourab/west-bengal/india
          </p>
        </div>

        {/* Blinking cursor */}
        <p>
          <span className="text-accent">➜</span>{" "}
          <span className="text-foreground">~ </span>
          <span className="text-accent animate-blink">█</span>
        </p>
      </div>
    </div>
  );
}

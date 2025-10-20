"use client";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-muted to-background py-16 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* D6VS Creative Explanation */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl  text-foreground">
              What does <span className="text-primary">D6VS</span> mean?
            </h3>
          </div>

          <div className=" p-6 rounded-2xl max-w-2xl mx-auto">
            <p className="text-lg text-foreground leading-relaxed">
              Just make the <span className="font-bold text-primary">6</span>{" "}
              upside down to become{" "}
              <span className="font-bold text-primary">9</span>, then flip it
              horizontally to look like{" "}
              <span className="font-bold text-primary">e</span>, revealing{" "}
              <span className="font-black text-primary text-xl">DEVS</span>!
            </p>
            <div className="mt-4 p-4 bg-background/50 rounded-lg">
              <p className="text-sm text-muted-foreground italic">
                Because we&apos;re developers who think outside the box even our name needs decoding!
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

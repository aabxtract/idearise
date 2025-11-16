export function Background() {
    return (
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="relative h-full w-full">
          <div
            className="absolute -bottom-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-primary/20 blur-3xl"
            style={{ animation: 'float-1 20s infinite ease-in-out' }}
          />
          <div
            className="absolute -top-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-accent/20 blur-3xl"
            style={{ animation: 'float-2 25s infinite ease-in-out' }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 h-1/3 w-1/3 rounded-full bg-primary/10 blur-3xl"
            style={{ animation: 'float-3 15s infinite ease-in-out' }}
          />
        </div>
      </div>
    );
  }
  
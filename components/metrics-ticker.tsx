export default function MetricsTicker() {
  const items = [
    '✦ 12,400+ writers trust WritePro',
    '✦ 2.1M words improved this month',
    '✦ Used by teams at agencies, startups & studios',
    '✦ 4.9★ average rating',
    '✦ Free to start — no credit card required',
  ]

  return (
    <div
      style={{
        background: '#0c0c0e',
        borderBottom: '1px solid #1f1f23',
        height: '40px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .metrics-scroll-container {
          display: flex;
          animation: scroll-left 40s linear infinite;
          white-space: nowrap;
        }

        .metrics-scroll-container:hover {
          animation-play-state: paused;
        }

        .metrics-item {
          display: inline-block;
          padding: 0 32px;
          font-size: 12px;
          letter-spacing: 0.02em;
          color: #71717a;
          font-weight: 400;
          line-height: 40px;
          flex-shrink: 0;
        }

        .metrics-item-separator {
          color: #2dd4bf;
        }
      `}</style>

      <div className="metrics-scroll-container">
        {/* First set of items */}
        {items.map((item, index) => (
          <div key={index} className="metrics-item">
            {item}
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {items.map((item, index) => (
          <div key={`duplicate-${index}`} className="metrics-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

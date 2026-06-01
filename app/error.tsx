'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'inherit' }}>
      <h2 style={{ color: '#fff', marginBottom: '16px' }}>Something went wrong</h2>
      <p style={{ color: '#a1a1aa', marginBottom: '24px', fontSize: '14px' }}>
        {error.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '8px 16px',
          backgroundColor: '#2dd4bf',
          color: '#000',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        Try again
      </button>
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default function Dashboard() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard. Please ensure you're logged in via the ClerkProvider in layout.tsx</p>
      <p>Your dashboard content will be displayed here after authentication.</p>
    </div>
  )
}

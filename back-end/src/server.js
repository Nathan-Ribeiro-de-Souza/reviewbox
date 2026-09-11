import { app } from './app.js'
import { test } from './database.js'

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`ReviewBox API running on http://localhost:${PORT}`)
  test()
})
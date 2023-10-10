import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"

const pool = new Pool({
  host: '161.246.127.24',
  port: 9077,
  database: 'dbitag',
  user: 'clmtbmrw30079bsmnfdwi4ovp',
  password: 'YcVOt4I2p6X3YTDXNltyKgxN',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

const handler = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ]
})

export {handler as GET, handler as POST}
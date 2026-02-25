import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
password: text("password").notNull(),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id), // ✅ RELATION ADDED

  crop: text("crop").notNull(),
  disease: text("disease").notNull(),
  confidence: integer("confidence").notNull(),
  severity: text("severity").notNull(),
  status: text("status").notNull(),

  advisory: text("advisory").notNull(),
  temperature: integer("temperature"),
  humidity: integer("humidity"),
  rainfall: integer("rainfall"),

  createdAt: timestamp("created_at").defaultNow(),
});
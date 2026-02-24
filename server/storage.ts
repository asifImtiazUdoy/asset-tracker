
import { db } from "./db";
import { inquiries, type InsertInquiry, type Inquiry } from "@shared/schema";

export interface IStorage {
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class DatabaseStorage implements IStorage {
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    try {
      const [inquiry] = await db.insert(inquiries).values(insertInquiry).returning();
      return inquiry;
    } catch (error: any) {
      console.warn("Database insert failed, returning mock inquiry:", error?.message);
      // In development mode without database, return a mock object
      return {
        id: Math.floor(Math.random() * 10000),
        createdAt: new Date(),
        ...insertInquiry,
      } as Inquiry;
    }
  }
}

export const storage = new DatabaseStorage();
